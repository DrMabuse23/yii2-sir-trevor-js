<?php
/**
 * Created by PhpStorm.
 * User: pascal
 * Date: 07.02.14
 * Time: 08:27
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