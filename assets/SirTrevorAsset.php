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
    /**
     * @var language file
     */
    public $language    = '';

    /**
     * @var string
     */
    public $assetMode   = 'min';

    /**
     * @var string
     */
    public $sourcePath  = '@vendor/drmabuse/yii2-sir-trevor-js/web';

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
        "dist/scripts/yii2-sirtrevorjs-0.0.3.min.js"
    ];

    /**
     * @var array
     */
    public $dev_js = [
        'dist/vendor/underscore/underscore.js',
        'dist/vendor/Eventable/eventable.js',
        'dist/vendor/sir-trevor-js/sir-trevor.js',
        "dist/blocks/CodeBlock.js",
        "dist/blocks/ColumnsBlock.js",
        "dist/blocks/Gallery.js",
        "dist/blocks/ImageCaption.js",

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
    public $forceCopy = true;

    /**
     * @param $view
     * @param $language
     * @param $assetmode
     */
    public function init(){
//        if($this->assetMode === 'min')
//            return parent::init();

        $this->js = $this->dev_js;
        parent::init();
        VarDumper::dump([$this->assetMode]);
        exit;
    }


}