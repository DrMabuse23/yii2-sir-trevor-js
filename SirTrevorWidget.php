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
namespace drmabuse\blog\extensions\sirtrevorjs;

use common\helpers\Glyph;
use Yii;
use yii\base\Widget;
use yii\helpers\Html;
use yii\helpers\Json;
use yii\helpers\Url;
use yii\helpers\VarDumper;
use yii\web\HttpException;
use yii\web\JsExpression;
use drmabuse\blog\extensions\sirtrevorjs\assets\SirTrevorCompleteAsset;
use yii\web\View;
use yii\widgets\InputWidget;

/**
 * Class SirTrevorWidget
 * @package yii2-sirtrevorjs
 */
class SirTrevorWidget extends InputWidget
{

    /**
     * debug mode on off
     * @var bool
     */
    public $debug = 'false';
    /**
     * default_language
     * @var string
     */
    public $language = 'en';
    /**
     * mus be an array of options
     * @var null
     */
    public $blockOptions = null;

    /**
     * you can set full/standard or set your own
     * @var string
     */
    public $block_type = 'full';

    /**
     * blockTypes
     * @var array
     */
    public $blockTypes = [
        "Heading",
        "Text",
        "List",
        "Quote",
        "Image",
        "Video"
    ];

    /**
     * @var array
     */
    public $blockTypesFull = [
        "Heading",
        "Text",
        "List",
        "Quote",
        "Image",
        "Video",
        "Tweet",
        "Columns",
        "Code",
        "Gallery"
    ];
    /**
     * the area element
     * @var string
     */
    public $element = '.sir-trevor';

    /**
     * @var string
     */
    public $imageUploadUrl = null;
    /**
     * @var null
     */
    public $initJs = null;

    /**
     * textarea options
     * @var array
     */
    public $options;

    /**
     * the save button options
     *
     * @var array
     */
    public $saveButtonOptions = [];

    /**
     * the css class from the save button
     * @var string
     */
    public $saveButtonCssClass = 'btn btn-primary';

    /**
     * like __construct
     * @throws \yii\base\InvalidConfigException
     */
    public function init()
    {
        parent::init();
    }

    /**
     * set the element as class to the texteare
     * @return string|void
     */
    public function run()
    {
        $this->options['class'] = str_replace('.', '', $this->element);
        $this->registerAsset();
        echo $this->renderInput();
    }

    /**
     * register the concated files
     */
    private function registerAsset()
    {
        SirTrevorCompleteAsset::register($this->view)->language = $this->language;
        $this->view->registerJs('$(function(){' . $this->getInitJs() . '});',View::POS_END);
    }

    /**
     * <div><button id="save" class="btn btn-primary"></button></div>
     * <textarea class='sir-trevor'></textarea>
     * Render the text area input
     */
    protected function renderInput()
    {
        $input = Html::tag(
            'div',
            Html::button(
                Glyph::icon(Glyph::ICON_FLOPPY_SAVE) . ' save',
                $this->saveButtonOptions
            )
        );

        if ($this->hasModel()) {
            $input .= Html::activeTextArea($this->model, $this->attribute, $this->options);
        } else {
            $input .= Html::textArea($this->name, $this->value, $this->options);
        }


        return $input;
    }


    /**
     * @return array
     */
    public function getSaveButtonOptions()
    {
        if (count($this->saveButtonOptions) < 1) {
            $this->saveButtonOptions = [
                'type'  => 'button',
                'id'    => uniqid('sir-trevor-save-button-'),
                'class' => $this->saveButtonCssClass
            ];
        }
        return $this->saveButtonOptions;
    }

    /**
     * @param $saveButtonOptions
     */
    public function setSaveButtonOptions($saveButtonOptions)
    {
        $this->saveButtonOptions = $saveButtonOptions;
    }

    /**
     * @return array
     */
    public function getBlockTypes()
    {
        if ($this->block_type === 'full') {
            return $this->blockTypesFull;
        }

        return $this->blockTypesFull;
    }

    /**
     * @param array $blockTypes
     */
    public function setBlockTypes($blockTypes)
    {
        $this->blockTypes = $blockTypes;
    }

    /**
     * @return string
     */
    public function getImageUploadUrl()
    {
        if ($this->imageUploadUrl === null) {
            $this->imageUploadUrl = Url::to(['/blog/crud/post-content/upload']);
        }
        return $this->imageUploadUrl;
    }

    /**
     * @param string $imageUploadUrl
     */
    public function setImageUploadUrl($imageUploadUrl)
    {
        $this->imageUploadUrl = $imageUploadUrl;
    }

    /**
     * @return null
     */
    public function getBlockOptions()
    {
        if (is_null($this->blockOptions)) {
            $this->blockOptions = Json::encode(
                [
                    'el'          => new JsExpression("$('{$this->element}')"),
                    'blockTypes'  => $this->getBlockTypes(),
                    'defaultType' => false
                ]
            );
        }

        return $this->blockOptions;
    }

    /**
     * setting a standard js
     * @return null
     */
    public function getInitJs()
    {
        $this->getSaveButtonOptions();

        if (is_null($this->initJs)) {

            if(!isset($this->saveButtonOptions['id']))
                throw new HttpException(1,'save button id is required',400);

            $this->initJs = 'SirTrevor.DEBUG = ' . $this->debug . ';' . PHP_EOL;
            $this->initJs .= 'SirTrevor.LANGUAGE = "' . $this->language . '";' . PHP_EOL;
            $this->initJs .= 'SirTrevor.setDefaults({ uploadUrl: "' . $this->getImageUploadUrl() . '" });' . PHP_EOL;
            $this->initJs .= "window.editor = new SirTrevor.Editor(" . $this->getBlockOptions() . ");" . PHP_EOL;
            $this->initJs .= "
                $('#{$this->saveButtonOptions['id']}').on('click',
                    function() {
                        SirTrevor.getInstance().store('save');
                        console.log('store saved');
                    }
            );" . PHP_EOL;
        }

        return $this->initJs;
    }

    /**
     * @param null $initJs
     */
    public function setInitJs($initJs)
    {
        $this->initJs = $initJs;
    }






} 