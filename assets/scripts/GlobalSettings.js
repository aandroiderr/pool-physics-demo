var Global = cc.Class({
    extends: cc.Component,
    editor: {
        executeInEditMode: true
    },

    properties: {
        CUE_BALL_WEIGHT : 2,
        BALL_WEIGHT : 1,
        BALL_R : 15,
        MAX_SPEED : 200,
        FRICTION : 0.25,
        ELASTICITY : 0.3,
        IMPULSE : 200,
        WALL_WIDTH : 32,
        WALL_FRICTION : 1.0,
        WALL_ELASTICITY : 2.0
    },
    onLoad: function () {
        Global.instance = this;
    }
});