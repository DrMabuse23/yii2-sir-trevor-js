<?php
/**
 * Created by PhpStorm.
 * User: pascal
 * Date: 08.02.14
 * Time: 21:41
 */

namespace sirtrevorjs;

use Yii;
use sirtrevorjs\assets\SirTrevorCompleteAsset;
use yii\base\Widget;

class SirTrevorWidget extends Widget {

    public $debug           = false;
    public $language        = 'en';
    public $blockOptions    = [];
    public $blockTypes      = ["Heading","Text","List","Quote","Image","Video","Tweet"];
    public $element;
    public $model;

    public $assetMode       = 'complete';


    public function init(){
        parent::init();
        Yii::setAlias('@sirtrevorjs', dirname(__FILE__));
        $this->registerAsset();
    }

    private function registerAsset(){
        $view = $this->getView();
        SirTrevorCompleteAsset::register($view);
    }

} 