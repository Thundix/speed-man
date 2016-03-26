'use strict'
describe("TextItem > ", function () {

    it("should be created with graphical element", function () {
        // When
        var textItem = new TextItem("lorem ipsum", 7, 20);

        // Then
        expect(textItem.getRenderer()).not.toBe(undefined);
        var graphicalElement = textItem.getRenderer().getGraphicalElement();
        expect(graphicalElement).not.toBe(undefined);

        expect(graphicalElement.x).toBe(7);
        expect(graphicalElement.y).toBe(20);
        
        expect(graphicalElement.text).toBe('lorem ipsum');
        expect(graphicalElement.font).toBe(TEXT_FONT_DEFAULT);
        expect(graphicalElement.color).toBe(TEXT_COLOR_DEFAULT);
    });
});