<?php
/**
 * Created by PhpStorm.
 * User: pascal
 * Date: 07.02.14
 * Time: 08:27
 */

namespace drmabuse\sirtrevorjs\assets;

//const VERSION = '0.0.2';
use Yii;
use yii\web\AssetBundle;

class SirTrevorAsset extends AssetBundle
{
    public $language;
    public $sourcePath = '@vendor/drmabuse/yii2-sir-trevor-js/assets';
    /**
     * @var array
     */
    public $css = [
        "grunt/yii2-sirtrevorjs-0.0.3.css",
    ];
    /**
     * @var array
     */
    public $js = [
        "grunt/yii2-sirtrevorjs-0.0.3.js",
        "grunt/locales/de.js",
        "grunt/locales/es.js",
        "blocks/CodeBlock.js",
        "blocks/ColumnsBlock.js",
        "blocks/Gallery.js",
        "blocks/ImageCaption.js",
    ];
    /**
     * @var array
     */
    public $depends = [
        'yii\web\JqueryAsset',
        'yii\web\YiiAsset'
    ];

    public $forceCopy = true;
}