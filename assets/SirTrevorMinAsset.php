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

class SirTrevorMinAsset extends AssetBundle
{
    public $language;
    public $sourcePath = '@vendor/drmabuse/yii2-sir-trevor-js/assets';
    /**
     * @var array
     */
    public $css = [
        "grunt/yii2-sirtrevorjs-0.0.3.min.css",
    ];
    /**
     * @var array
     */
    public $js = [
        "grunt/yii2-sirtrevorjs-0.0.3.min.js",
    ];
    /**
     * @var array
     */
    public $depends = [
        'yii\web\JqueryAsset',
        'yii\web\YiiAsset'
    ];
}