<?php
/**
 * Created by PhpStorm.
 * User: pascal
 * Date: 07.02.14
 * Time: 08:27
 */

namespace drmabuse\blog\extensions\sirtrevorjs\assets;
//const VERSION = '0.0.2';
use Yii;
use yii\web\AssetBundle;

class SirTrevorCompleteAsset extends AssetBundle {
    public $language;
    public $sourcePath  = '@vendor/drmabuse/yii2-blog/extensions/sirtrevorjs/dist';
    /**
     * @var array
     */
    public $css = [
        'yii2-sirtrevorjs-0.0.2.min.css',
    ];
    /**
     * @var array
     */
    public $js = [
        "yii2-sirtrevorjs-0.0.2.min.js",
        "locales/de.js"
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

//        if ($language !== 'de' && in_array($language,$this->availableLanguages)) {
//            $this->js[] = '/../bower_components/sir-trevor-js/locales/' .  'de.js';
//        }

        parent::registerAssetFiles($view);
    }
}