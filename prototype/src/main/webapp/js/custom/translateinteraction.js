goog.provide('pmap.interaction.Translate');

goog.require('ol.interaction.Translate');

pmap.interaction.Translate = function(options) {
	goog.base(this, options);
};
goog.inherits(pmap.interaction.Translate, ol.interaction.Translate);

pmap.interaction.Translate.prototype.setFeatures = function(features) {
	this.features_ = features;
};