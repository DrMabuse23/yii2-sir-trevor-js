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
namespace drmabuse\sirtrevorjs\assets;

use Yii;
use yii\helpers\ArrayHelper;
use yii\helpers\VarDumper;
use yii\web\AssetBundle;

class SirTrevorAsset extends AssetBundle
{
    /**
     * @var language file
     */
    public $options = [
        'language'  => 'en',
        'assetMode' => 'min'
    ];


    /**
     * @var string
     */
    public $sourcePath = '@vendor/drmabuse/yii2-sir-trevor-js/web';

    /**
     * @var array
     */
    public $css = [
        "dist/styles/yii2-sirtrevorjs-0.0.5.min.css",
    ];
    public $dev_css = [
        "styles/sir-trevor.css",
        "styles/sir-trevor-icons.css",
    ];
    /**
     * @var array
     */
    public $js = [
        "dist/scripts/yii2-sirtrevorjs-0.0.5.min.js"
    ];

    /**
     * @var array
     */
    public $dev_js = [
        'scripts/lib/underscore/underscore.js',
        'scripts/lib/Eventable/eventable.js',
        'scripts/lib/sir-trevor-js/sir-trevor.js',
        "scripts/blocks/CodeBlock.js",
        "scripts/blocks/ColumnsBlock.js",
        "scripts/blocks/Gallery.js",
        "scripts/blocks/ImageCaption.js",

    ];
    /**
     * @var array
     */
    public $depends = [
        'yii\web\JqueryAsset',
        'yii\web\YiiAsset'
    ];

    /**
     * @var bool
     */
    public $forceCopy = false;

    /**
     *
     */
    public function registerAssetFiles($view)
    {

        $language = $this->options['language'];
        $mode     = $this->options['assetMode'];
        $langFile = is_file($this->sourcePath . "/dist/scripts/locales/{$language}.js") ?
            "dist/scripts/locales/{$language}.js" : null;

        if ($mode === 'min' && $language !== 'en' && $langFile !== null) {
            $this->js = ArrayHelper::merge($this->js, [$langFile]);
        } else {
            $this->css = $this->dev_css;
            $this->js  = $this->dev_js;
            if ($language !== 'en' && $langFile !== null) {
                $this->js = ArrayHelper::merge($this->js, [$langFile]);
            }
        }

        /**
         * @todo double code
         */

        foreach ($this->js as $js) {
            if ($js[0] !== '/' && $js[0] !== '.' && strpos($js, '://') === false) {
                $view->registerJsFile($this->baseUrl . '/' . $js, [], $this->jsOptions);
            } else {
                $view->registerJsFile($js, [], $this->jsOptions);
            }
        }
        foreach ($this->css as $css) {
            if ($css[0] !== '/' && $css[0] !== '.' && strpos($css, '://') === false) {
                $view->registerCssFile($this->baseUrl . '/' . $css, [], $this->cssOptions);
            } else {
                $view->registerCssFile($css, [], $this->cssOptions);
            }
        }
    }
}