define([
  'text!templates/auth/signup.html'
, 'models/auth/signup'
], function( template, SignupModel ) {
  var SignupView = Backbone.View.extend({
    tagName: 'div'
  , className: 'signup'
  , template: _.template( template )
  , events: {
      'submit': 'submitForm'
    }
  , initialize: function( options ) {
      this.Pubsub = options.Pubsub;
      this.model = new SignupModel();
      this.model.on('invalid', function( model, err ) {
        console.log( err );
      });
    }
  , render: function() {
      this.$el.html( this.template() );
      this.delegateEvents();
      return this;
    }
  , submitForm: function( evt ) {
      evt.preventDefault();
      this.model.set({
        fName: this.$el.find( '#fName' ).val()
      , lName: this.$el.find( '#lName' ).val()
      , email: this.$el.find( '#email' ).val()
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

          self.Pubsub.trigger( 'loggedIn' );
        }
      });

    }
  });

  return SignupView;
});