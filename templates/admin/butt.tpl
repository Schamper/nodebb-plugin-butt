<div class="row">
    <div class="col-md-12">
        <h1>Butt</h1>
    </div>
</div>

<div class="row">
    <form class="form" id="buttAdminForm">
        <div class="col-xs-12">
            <h3>Butt word list
                <button class="btn btn-success btn-xs save">Save</button>
            </h3>

            <hr>

            <div class="form-group">
                <input data-key="words" type="text" class="form-control">
            </div>
        </div>
    </form>
</div>

<script>
    require(['settings'], function (settings) {
        var wrapper = $('#buttAdminForm');

        settings.sync('butt', wrapper);

        $('.save').click(function(event) {
            event.preventDefault();
            settings.persist('butt', wrapper, function(){
                socket.emit('admin.plugins.butt.sync');
            });
        });
    });
</script>