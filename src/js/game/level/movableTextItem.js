function MovableTextItem(text2, x, menuHandler, possibleYPositions) { // todo extends TextItem?
    var item = this;
    var selectedItem = 0;
    var text = new createjs.Text(text2, TEXT_FONT_DEFAULT, TEXT_COLOR_DEFAULT);

    item.getRenderer = getRenderer;
    var renderer = new MovableTextRenderer(x, possibleYPositions[selectedItem]);


    function getRenderer() {
        return renderer;
    }


    /*internal class*/
    function MovableTextRenderer(newX, newY) {
        var textRenderer = this;

        text.x = newX;
        text.y = newY;

        textRenderer.getGraphicalElement = getGraphicalElement;
        textRenderer.tick = tick;

        function getGraphicalElement(loader) {
            return text;
        }

        function setY(newY2) {
            text.y = newY2;
        }

        /*Do nothing for a bitmap */
        function tick(delta) {
            if (menuHandler.isDown()) {
                selectedItem++;
                selectedItem %= possibleYPositions.length;
                menuHandler.setKeyTreated();
            }

            if (menuHandler.isUp()) {
                selectedItem--;
                if(selectedItem < 0){
                    selectedItem =  possibleYPositions.length - 1;
                }
                menuHandler.setKeyTreated();
            }

            setY(possibleYPositions[selectedItem]);
        }
    }

}