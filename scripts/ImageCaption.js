// Adds a Caption Field to the Image Block
(function ($){
	SirTrevor.Blocks.Image = SirTrevor.Block.extend({

		type: "image",
		title: function() { return 'Image' },

		droppable: true,
		uploadable: true,

		icon_name: 'image',

		loadData: function(data){
		  this.$editor.html($('<img>', { src: data.file.url })).show();
		  this.$editor.append($('<input>', {type: 'text', class: 'st-input-string js-caption-input', name: 'text', placeholder: 'Caption', style: 'width: 100%; margin-top:10px; text-align: center;', value: data.text}));
		},

		onBlockRender: function(){
		  /* Setup the upload button */
		  this.$inputs.find('button').bind('click', function(ev){ ev.preventDefault(); });
		  this.$inputs.find('input').on('change', _.bind(function(ev){
		    this.onDrop(ev.currentTarget);
		  }, this));
		},

		onDrop: function(transferData){
		  var file = transferData.files[0],
		      urlAPI = (typeof URL !== "undefined") ? URL : (typeof webkitURL !== "undefined") ? webkitURL : null;

		  // Handle one upload at a time
		  if (/image/.test(file.type)) {
		    this.loading();
		    // Show this image on here
		    this.$inputs.hide();
		    this.loadData({file: {url: urlAPI.createObjectURL(file)}});

		    this.uploader(
		      file,
		      function(data) {
		        this.setData(data);
		        this.ready();
		      },
		      function(error){
		        this.addMessage(i18n.t('blocks:image:upload_error'));
		        this.ready();
		      }
		    );
		  }
		}
	});
}(jQuery));