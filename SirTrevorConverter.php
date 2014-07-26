<?php
/**
 * 2014 , 05 03
 *
 * Copyright (c) 2014, Pascal Brewing <pascalbrewing@gmail.com>
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 * Redistributions of source code must retain the above copyright notice, this
 * list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this
 * list of conditions and the following disclaimer in the documentation and/or
 * other materials provided with the distribution.
 * Neither the name of the {organization} nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
 * ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

namespace drmabuse\sirtrevorjs;

use \Michelf\MarkdownExtra as Markdown;
use yii\helpers\VarDumper;

/**
 * Class SirTrevorConverter
 * @package drmabuse\sirtrevorjs
 * @author <pascalbrewing@gmail.com>
 */

class SirTrevorConverter {
    /**
     * Code JS needed by elements
     *
     * @access protected
     * @var array
     */
    protected $codejs = null;

    /**
     * Converts the outputted json from Sir Trevor to html
     *
     * @param string $json
     * @return string
     */
    public function toHtml($json)
    {
        // convert the json to an associative array
        $input = json_decode($json, true);
        $html  = null;

        if (!empty($input) && is_array($input)) {
            // loop trough the data blocks
            foreach ($input['data'] as $block) {

                // no data, problem
                if (!isset($block['data'])) {
                    break;
                }

                // check if we have a converter for this type
                $converter = $block['type'] . 'ToHtml';
                if (is_callable(array($this, $converter))) {
                    // call the function and add the data as parameters
                    $html .= call_user_func_array(
                        array($this, $converter),
                        $block['data']
                    );
                } elseif ($block['type'] == "tweet") {
                    // special twitter
                    $html .= $this->twitterToHtml($block['data']);
                } elseif (array_key_exists('text', $block['data'])) {
                    // we have a text block. Let's just try the default converter
                    $html .= $this->defaultToHtml($block['data']['text']);
                }
            }

            // code js
            if ($this->codejs != null && is_array($this->codejs)) {
                foreach ($this->codejs as $arr) {
                    $html .= $arr;
                }
            }
        }

        return $html;
    }

    /**
     * Converts default elements to html
     *
     * @param string $text
     * @return string
     */
    public function defaultToHtml($text)
    {
        return Markdown::defaultTransform($text);
    }


    /**
     * Converts headers to html
     *
     * @param string $text
     * @return string
     */
    public function headingToHtml($text)
    {
        return '<h2>' . $text . '</h2>';
    }

    /**
     * Converts block quotes to html
     *
     * @param string $cite
     * @param string $text
     * @return string
     */
    public function blockquoteToHtml($cite, $text)
    {
        // remove the indent thats added by Sir Trevor
        $text = ltrim($text, '>');

        $html = '<blockquote>';

        $html .= Markdown::defaultTransform($text);

        // Add the cite if necessary
        if (!empty($cite)) {
            $html .= '<cite>' . $cite . '</cite>';
        }

        $html .= '</blockquote>';
        return $html;
    }

    /**
     * Converts quote to html
     *
     * @param string $cite
     * @param string $text
     * @return string
     */
    public function quoteToHtml($cite, $text)
    {
        return $this->blockquoteToHtml($cite, $text);
    }

    /**
     * Converts the image to html
     *
     * @param array $file
     * @param string $caption
     * @return string
     */
    public function imageToHtml($file, $caption = '')
    {
        $_return = '<figure class="st-image"><img src="' . $file['url'] . '" alt="" />';

        if ($caption != null) {
            $_return .= '<figcaption>'.$caption.'</figcaption>';
        }

        $_return .= '</figure>';

        return $_return;
    }


    /**
     * Converts the video to html
     *
     * @param string $provider
     * @param string $remote_id
     * @param string $caption
     * @return string
     */
    public function videoToHtml($provider, $remote_id, $caption = null)
    {
        $html = null;

        switch ($provider) {
            /**
             * Youtube
             */
            case "youtube":
                $html = '<iframe width="580" height="320" src="//www.youtube.com/embed/'.$remote_id.'" frameborder="0" allowfullscreen></iframe>';
                break;

            /**
             * Vimeo
             */
            case "vimeo":
                $html = '<iframe src="//player.vimeo.com/video/'.$remote_id.'?title=0&amp;byline=0" width="580" height="320" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
                break;

            /**
             * Dailymotion
             */
            case "dailymotion":
                $html = '<iframe frameborder="0" width="580" height="320" src="//www.dailymotion.com/embed/video/'.$remote_id.'"></iframe>';
                break;

            /**
             * Vine
             */
            case "vine":
                $this->codejs['vine'] = '<script async src="http://platform.vine.co/static/scripts/embed.js" charset="utf-8"></script>';

                $html = '<iframe class="vine-embed" src="//vine.co/v/'.$remote_id.'/embed/simple" width="580" height="320" frameborder="0"></iframe>';
                break;

            /**
             * Metacafe
             */
            case "metacafe":
                $html = '<iframe src="http://www.metacafe.com/embed/'.$remote_id.'/" width="540" height="304" allowFullScreen frameborder=0></iframe>';
                break;

            /**
             * Yahoo video
             */
            case "yahoo":
                $html = '<iframe width="640" height="360" scrolling="no" frameborder="0" src="http://screen.yahoo.com/embed/'.$remote_id.'.html" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true" allowtransparency="true"></iframe>';
                break;

            /**
             * UStream Live
             */
            case "ustream":
                $html = '<iframe width="640" height="392" src="http://www.ustream.tv/embed/'.$remote_id.'?v=3&amp;wmode=direct" scrolling="no" frameborder="0" style="border: 0px none transparent;"></iframe>';
                break;

            /**
             * UStream Recorded
             */
            case "ustreamrecord":
                $html = '<iframe width="640" height="392" src="http://www.ustream.tv/embed/recorded/'.$remote_id.'?v=3&amp;wmode=direct" scrolling="no" frameborder="0" style="border: 0px none transparent;"></iframe>';
                break;

            /**
             * Veoh
             */
            case "veoh":
                $html = '<object width="640" height="532" id="veohFlashPlayer" name="veohFlashPlayer"><param name="movie" value="http://www.veoh.com/swf/webplayer/WebPlayer.swf?version=AFrontend.5.7.0.1444&amp;permalinkId='.$remote_id.'&amp;player=videodetailsembedded&amp;videoAutoPlay=0&amp;id=anonymous"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.veoh.com/swf/webplayer/WebPlayer.swf?version=AFrontend.5.7.0.1444&amp;permalinkId='.$remote_id.'&amp;player=videodetailsembedded&amp;videoAutoPlay=0&amp;id=anonymous" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="640" height="532" id="veohFlashPlayerEmbed" name="veohFlashPlayerEmbed"></embed></object>';
                break;

            /**
             * Vevo
             */
            case "vevo":
                $html = '<iframe width="575" height="324" src="http://cache.vevo.com/m/html/embed.html?video='.$remote_id.'" frameborder="0" allowfullscreen></iframe>';
                break;

            /**
             * AOL
             */
            case "aol":
                $html = '<script type="text/javascript" src="http://pshared.5min.com/Scripts/PlayerSeed.js?sid=281&amp;width=560&amp;height=345&amp;playList='.$remote_id.'"></script>';
                break;

            /**
             * Metatube
             */
            case "metatube":
                $html = '<iframe width="640" height="480" src="http://www.metatube.com/en/videos/'.$remote_id.'/embed/" frameborder="0" allowfullscreen></iframe>';
                break;

            /**
             * Wat.tv
             */
            case "wat":
                $html = '<iframe src="http://www.wat.tv/embedframe/'.$remote_id.'\" frameborder="0" style="width: 640px; height: 360px;"></iframe>';
                break;

            /**
             * Daily Mail UK
             */
            case "dailymailuk":
                $html = '<iframe frameborder="0" width="698" height="503" scrolling="no" id="molvideoplayer" title="MailOnline Embed Player" src="http://www.dailymail.co.uk/embed/video/'.$remote_id.'.html" ></iframe>';
                break;

            /**
             * Canal Plus
             */
            case "cplus":
                $html = '<iframe width="640" height="360" frameborder="0" scrolling="no" src="http://player.canalplus.fr/embed/?param=cplus&amp;vid='.$remote_id.'"></iframe>';
                break;

            /**
             * France Television
             */
            case "francetv":
                $html = '<iframe frameborder="0" width="640" height="360" src="http://api.dmcloud.net/player/embed/'.$remote_id.'?exported=1"></iframe>';
                break;

            /**
             * Zoomin.tv
             */
            case "zoomin":
                $html = '<iframe src="http://blackbird.zoomin.tv/players/.pla?pid=corporatefr&amp;id='.$remote_id.'&amp;w=655&amp;h=433" style="width:655px; height:433px; border:none; overflow:hidden;" frameborder="0" scrolling="no" allowtransparency="yes"></iframe>';
                break;

            /**
             * Global News
             */
            case "globalnews":
                $html = '<iframe src="http://globalnews.ca/video/embed/'.$remote_id.'/" width="670" height="437" frameborder="0" allowfullscreen></iframe>';
                break;
        }

        /**
         * Caption
         */
        if ($html != null && $caption != null) {
            $html .= '<figcaption>'.$caption.'</figcaption>';
        }

        if ($html != null) {
            return '<figure class="st-movie">'.$html.'</figure>';
        }

        return null;
    }
}