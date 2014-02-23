<?php
/**
 * Created by PhpStorm.
 * User: pascal
 * Date: 07.02.14
 * Time: 08:27
 */

namespace sirtrevorjs\assets;
const VERSION = '0.0.2';
use Yii;
use yii\web\AssetBundle;

class SirTrevorCompleteAsset extends AssetBundle {

    public $sourcePath = '@sirtrevorjs/dist';
    public $css = [
        'yii2-sirtrevorjs-0.0.2.min.css',
    ];
    public $js = [
        "yii2-sirtrevorjs-0.0.2.min.js"
    ];

    public $depends = [
        'yii\web\JqueryAsset',
        'yii\web\YiiAsset'
    ];

    /**
     * @var array
     */
    public $publishOptions = [
        'forceCopy' => true
    ];
} 