define([ 'js/models/auth/signup' ], function( SignupModel ) {
  var SignupView = Backbone.View.extend({
    el: '.signup'
  , events: {
      'submit': 'submitForm'
    , 'click .toggle-login': 'toggleView'
    }
  , initialize: function( options ) {
      var self = this;

      this.Pubsub = options.Pubsub;
      this.model = new SignupModel();
      this.model.on('invalid', function( model, errors ) {
        self.$el.find( '.errors' ).empty();
        self.$el.find( 'input' ).removeClass( 'error' );
        for ( var err in errors.fields ) {
          if ( errors.fields[ err ]  !== '' ) {
            if ( (errors.fields[ err ] instanceof Array) && errors.fields[ err ].length ) {
              self.$el.find( '#' + err ).addClass( 'error' );
              _.each( errors.fields[ err ], function( msg ) {
                self.$el.find( '.errors' ).append( '<p class="error-msg">' + msg + '</p>' );
              });
            } else if ( !(errors.fields[ err ] instanceof Array) ){
              self.$el.find( '#' + err ).addClass( 'error' );
              self.$el.find( '.errors' ).append( '<p class="error-msg">' + errors.fields[ err ] + '</p>' );
            }
          }
        }
      });
    }
  , render: function() {
      this.$el.show();
      return this;
    }
  , hide: function() {
      this.$el.hide();
      return this;
    }
  , toggleView: function() {
      this.Pubsub.trigger( 'toggleLogin' );
      return this;
    }
  , submitForm: function( evt ) {
      evt.preventDefault();
      this.$el.find( '.errors' ).empty();
      this.model.set({
        email: this.$el.find( '#email' ).val()
      , username: this.$el.find( '#username' ).val()
      , password: this.$el.find( '#password' ).val()
      });

      var self = this;
      var attrs = this.model.attributes;
      this.model.save(attrs, {
        error: function( model, res, options ) {
          console.log( 'Signup failed.' );
          console.log( res.responseText );
        }
      , success: function( model, res, options ) {
          console.log( 'Signup successful.' );
          console.dir( res );
          window.location = '/user/' + res.fName;
        }
      });
    }
  });

  return SignupView;
});
