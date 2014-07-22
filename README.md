yii2-sir-trevor-js
==================

A Module for sir-trevor-js

***Yii2 Sir Trevor JS Widget***

    //using composer
    composer update

    //commands
    npm update
    bower update


### Example File Upload


    /**
     * Action for file uploads via sir-trevor image block from SirTrevorWidget (input widget)
     *
     * @param $root relative base folder
     */
    public function actionSirTrevorUpload($root)
    {
        $upload         = UploadedFile::getInstanceByName('attachment[file]');

        $model          = new File();

        $savePath       = \Yii::getAlias('@backend/web') . '/' . $model->path;

        if (!is_file($savePath) && is_dir(dirname($savePath))) {
            if ($upload->saveAs($model->path)) {
                if ($model->save()) {
                    echo Json::encode(['file' => ['url' => $model->path]]);
                    return;
                } else {
                    echo "Database record could not be saved.";
                }
            } else {
                echo "File could not be saved.";
            }
        } else {
            echo "File exists or root folder '{$savePath}' not found.";
        }
    }