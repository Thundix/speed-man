'use strict'
describe("MetalGear : primary weapon > ", function () {

    var weapon;

    beforeEach(function () {
        weapon = new MetalGear();
    });

    it("should not be able to create bullet initially", function () {
        // When
        var canCreate = weapon.canCreateBullet();

        // Then
        expect(canCreate).toBe(false);
    });
});