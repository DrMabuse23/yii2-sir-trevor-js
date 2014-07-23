yii2-sir-trevor-js
==================

A sir-trevor-js input widget for Yii 2 Framework.

## Get Started

Installation using composer:

    composer install drmabuse/yii2-sir-trevor-js:"*"

## Basic Usage

    <?=
    $form->field(
        $model,
        'attributeName')->widget(\drmabuse\sirtrevorjs\SirTrevorWidget::className(),
        ['imageUploadUrl' => \yii\helpers\Url::to(['file/sir-trevor-upload'])]
    )
    ?>

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

### Developer Info

If you want to compile/build from the latest javascript sources, use the following commands to get the JavaScript
dependencies.

    npm update
    bower update

To create the asset files run

    grunt

Minimized files are created with:

    grunt min

