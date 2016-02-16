$( document ).ready( function () {
    var posts = Data.getPosts();

    var navigationTemplate = Handlebars.compile( $( '#posts-container__navigation-template' ).html() );

    var selectedPage = 0;

    Handlebars.registerPartial(     'post-preview', $( '#post-preview-template' ).html() );
    Handlebars.registerHelper( 'nav', function( count, selected, options ) {
        var numbers = '';
        Array.apply( null, Array( count ) )
            .forEach(
                     function( v, i ) {
                         numbers += options.fn( { number: i + 1, selected: selectedPage == i } );
                     }
            );
        return numbers;
    } );

    render();

    function render(){
        renderPosts();
        renderNavigation();
        subscribeHandlers();
    }

    function renderPosts(){
        $( '.posts-container__list' ).html( postsTemplate( {
            posts: posts.slice( selectedPage * perPage, selectedPage * perPage + perPage )
        } ) );
    }

    function renderNavigation(){
        $( '.posts-container__navigation' ).html( navigationTemplate( {
            count: Math.ceil( posts.length / perPage ),
            selected: selectedPage
        } ) );
    }

});
