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

class SirTrevorCompleteAsset extends AssetBundle {
    public $language;
    public $sourcePath  = '@sirtrevorjs/';
    /**
     * @var array
     */
    public $css = [
        'dist/yii2-sirtrevorjs-0.0.2.min.css',
    ];
    /**
     * @var array
     */
    public $js = [
        "dist/yii2-sirtrevorjs-0.0.2.min.js"
    ];
    /**
     * @var array
     */
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

    /**
     * @var array
     */
    public $availableLanguages = [
        'en','de','es','fr'
    ];

    /**
     * @param \yii\web\View $view
     */
    public function registerAssetFiles($view)
    {
        $language = $this->language ? $this->language : Yii::$app->language;

        if ($language !== 'en' && in_array($language,$this->availableLanguages)) {
            $this->js[] = '/../bower_components/sir-trevor-js/locales/' . $language . '.js';
        }

        parent::registerAssetFiles($view);
    }
}