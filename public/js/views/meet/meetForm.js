define([
  'text!js/templates/meet/meetForm.html'
], function( meetFormTemplate ) {
  var MeetFormView = Backbone.View.extend({
    className: 'meet-maker__form'
  , template: _.template( meetFormTemplate )
  , initialize: function( options ) {
      this.App = options.App;
    }
  , events: {
      'keyup #what': 'updateMeetWhat'
    , 'keyup #where': 'updateMeetWhere'
    , 'keyup #when': 'updateMeetWhen'
    }
  , render: function() {
      this.delegateEvents();
      this.$el.html( this.template() );
    }
  , updateMeetWhat: function( evt ) {
      this.model.set( 'what', evt.currentTarget.value );
    }
  , updateMeetWhere: function( evt ) {
      this.model.set( 'where', evt.currentTarget.value );
    }
  , updateMeetWhen: function( evt ) {
      this.model.set( 'when', evt.currentTarget.value );
    }
  });

  return MeetFormView;
});
