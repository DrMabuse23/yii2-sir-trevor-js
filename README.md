yii2-sir-trevor-js
==================

#### Version 0.0.5
A sir-trevor-js input widget for Yii 2 Framework.

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
    
### Output 
````
    {"data":[{
        "type":"columns","data":{"columns":[{"width":6,"blocks":[{"type":"code","data":{"text":".....
```

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
                        $response->setStatusCode(500);
                        $response->statusText = "Database record could not be saved.";
                        \Yii::$app->end(0, $response);
                    }
                } else {
                    $response->setStatusCode(500);
                    $response->statusText = "File could not be saved.";
                    \Yii::$app->end(0, $response);
                }
            } else {
                $response->setStatusCode(500);
                $response->statusText = "File exists or root folder '{$savePath}' not found.";
                \Yii::$app->end(0, $response);
            }
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
    


