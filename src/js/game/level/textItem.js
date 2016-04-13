function TextItem(text, x, y) {
    var item = this;

    item.getRenderer = getRenderer;
    var renderer = new TextRenderer(text, x, y);


    function getRenderer() {
        return renderer;
    }


    /*internal class*/
    function TextRenderer(newText, newX, newY) {

        var textRenderer = this;
        textRenderer.getGraphicalElement = getGraphicalElement;
        textRenderer.tick = tick;

        function getGraphicalElement(loader) {
            var text = new createjs.Text(newText, TEXT_FONT_DEFAULT, TEXT_COLOR_DEFAULT); // todo creation of object inside a getter?
            text.x = newX;
            text.y = newY;
            return text;
        }


        /*Do nothing for a bitmap */
        function tick(delta) {

        }
    }

}