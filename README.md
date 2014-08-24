yii2-sir-trevor-js
==================

[![Latest Stable Version](https://poser.pugx.org/drmabuse/yii2-sir-trevor-js/v/stable.svg)](https://packagist.org/packages/drmabuse/yii2-sir-trevor-js) [![Total Downloads](https://poser.pugx.org/drmabuse/yii2-sir-trevor-js/downloads.svg)](https://packagist.org/packages/drmabuse/yii2-sir-trevor-js) [![Latest Unstable Version](https://poser.pugx.org/drmabuse/yii2-sir-trevor-js/v/unstable.svg)](https://packagist.org/packages/drmabuse/yii2-sir-trevor-js) [![License](https://poser.pugx.org/drmabuse/yii2-sir-trevor-js/license.svg)](https://packagist.org/packages/drmabuse/yii2-sir-trevor-js)

#### Version 0.0.5
a sir-trevor-js module

![Sir Trevor in action](https://raw.github.com/madebymany/sir-trevor-js/master/examples/sir-trevor.gif)
## Browser support

Sir Trevor is only tested on the following modern browsers:

- IE10+
- Chrome 25+
- Safari 5+
- Firefox 16+

## Dependencies

Sir Trevor requires [Underscore](http://underscorejs.org/) (or LoDash), [jQuery](http://jquery.com) (or Zepto) and [Eventable](https://github.com/madebymany/eventable).

## Contributing

See the [roadmap](https://github.com/madebymany/sir-trevor-js/wiki/Roadmap) and read a little about [the philosophy](https://github.com/madebymany/sir-trevor-js/wiki/Philosophy) guiding development.


#### Todo
    1. create output from Input
    

## Get Started

Installation using composer:

    composer install drmabuse/yii2-sir-trevor-js:"*"

## Basic Usage

    <?=
    $form->field(
        $model,
        'attributeName')->widget(\drmabuse\sirtrevorjs\SirTrevorWidget::className(),
        [
            'imageUploadUrl' => \yii\helpers\Url::to(['file/sir-trevor-upload']),
            'language'      => 'de',//es,fi,pt,fr,de,cn,
            'assetMode'     => 'min'//dev,
            'element'       => '.sir-trevor'// wil add to the textarea,
            'initJs'        => 'SirTrevor....'//PLZ read before Sir Trevor Api
            'options'       => ['class' => 'mysexyTextarea'],
            'blockOptions'  => Json::encode(
                 [
                    'el'          => new JsExpression("$('.sir-trevor')"),
                    'blockTypes'  => [
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
                     ],
                    'defaultType' => false
                ]
            )
        ]   
    )
    ?>
    //Output
    <?php
        use drmabuse\sirtrevorjs\SirTrevorConverter;
        $converter = new SirTrevorConverter();
    ?>
    <?= $converter->toHtml($json) ?>
    

## Advanced Usage

### Image Block - Example File Upload Handler

    /**
         * Action for file uploads via sir-trevor image block from SirTrevorWidget (input widget)
         *
         * @param $root relative base folder
         */
        public function actionSirTrevorUpload($root)
        {
            $upload         = UploadedFile::getInstanceByName('attachment[file]');
            $model          = new File();
            $name_id        = Inflector::slug(str_replace($upload->extension, '', $upload->name));
            $model->path    = 'images/' . $root . '/' . $model->name_id . '.' . $upload->extension;
            $savePath       = \Yii::getAlias('@backend/web') . '/' . $model->path;
            
            $response = new Response();
            $response->format = Response::FORMAT_JSON;
            $response->data['message'] = "File";
            
            if (!is_file($savePath) && is_dir(dirname($savePath))) {
                if ($upload->saveAs($model->path)) {
                    $model->mime_type = FileHelper::getMimeType($model->path);
                    $model->file_size = $upload->size;
                    if ($model->save()) {
                        $items = $this->getItems($this->rootPath);
                        list($width, $height, $type, $attr) = getimagesize($model->path);
                        $response->setStatusCode(200);
                        $response->content = Json::encode(['file' => ['url' => $model->path]]);
                        \Yii::$app->end(0, $response);
                    } else {
                        $response->statusText = "Database record could not be saved.";
                    }
                } else {
                    $response->statusText = "File could not be saved.";
                }
            }else{
                $response->statusText = "File exists or root folder '{$savePath}' not found.";
            }

            $response->setStatusCode(500);
            \Yii::$app->end(0, $response);

        }

### Developer Info

If you want to compile/build from the latest javascript sources, use the following commands to get the JavaScript
dependencies.

    npm update
    bower update

To create the asset files run

    grunt default
    
To create a new version

    grunt bumpup
    grunt semantic

![](http://pascal-brewing.de/img/works-on-my-machine.png)    


