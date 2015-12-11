var Physics = require('./physics');
var Global = cc.Class({
    extends: cc.Component,
    // editor: {
    //     executeInEditMode: true
    // },

    properties: {
        debugDisplay: true,
        instruction: {
            default: null,
            type: cc.Node
        },
        ballGroups: {
            default: [],
            type: [cc.Node]
        },
        ballNumberLevel: 1,
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
        this.startInstructionBlink();
        for (var i = 0; i < this.ballGroups.length; ++i) {
            if (this.ballNumberLevel < i) {
                this.ballGroups[i].active = false;
            }
        }

        cc.director.setDisplayStats(true);
    },

    startInstructionBlink: function() {
        // show instruction
        var fadeOut = cc.fadeTo(0.5, 0);
        var fadeIn = cc.fadeTo(0.5, 255);

        var blink = cc.repeatForever(cc.sequence(fadeOut, fadeIn));
        this.instruction._sgNode.runAction(blink);
    },

    hideInstruction: function() {
        this.instruction._sgNode.stopAllActions();
        this.instruction.active = false;
    },

    restart: function() {
        Physics.clear();
        cc.director.loadScene('table');
    }

});