'use strict'
describe("MovableTextItem > ", function () {

    var menuHandlerMock, possibleYPositionsMock;

    beforeEach(function () {
        menuHandlerMock = {
            isDown: function () {
            },
            isUp: function () {
            },
            setKeyTreated: function () {
            }
        };

        possibleYPositionsMock = [10, 20, 30];
    });

    it('should select first element by default', function () {
        // When
        var movableItem = new MovableTextItem("lorem ipsum", 7, menuHandlerMock, possibleYPositionsMock);

        // Then
        expect(movableItem.getRenderer()).not.toBe(undefined);
        var graphicalElement = movableItem.getRenderer().getGraphicalElement();
        expect(graphicalElement).not.toBe(undefined);
        expect(graphicalElement.x).toBe(7);
        expect(graphicalElement.y).toBe(possibleYPositionsMock[0]);
    });

    it('should select next item when menu handler is down', function () {
        // Given
        spyOn(menuHandlerMock, "isDown").and.returnValue(true);
        spyOn(menuHandlerMock, "setKeyTreated");
        var renderer = new MovableTextItem("lorem ipsum", 7, menuHandlerMock, possibleYPositionsMock).getRenderer();

        // When
        renderer.tick();

        // Then
        expect(menuHandlerMock.setKeyTreated).toHaveBeenCalled();
        expect(renderer.getGraphicalElement().y).toBe(possibleYPositionsMock[1]);

    });

    it('should select previous item when menu handler is up', function () {
        // Given
        spyOn(menuHandlerMock, "isUp").and.returnValue(true);
        spyOn(menuHandlerMock, "setKeyTreated");
        var renderer = new MovableTextItem("lorem ipsum", 7, menuHandlerMock, possibleYPositionsMock).getRenderer();

        // When
        renderer.tick();

        // Then
        expect(menuHandlerMock.setKeyTreated).toHaveBeenCalled();
        expect(renderer.getGraphicalElement().y).toBe(possibleYPositionsMock[2]);

    });
});