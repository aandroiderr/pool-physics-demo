var Globals = require('./GlobalSettings');
var Physics = require('./physics');
var BallType = cc.Enum({
    CUE: 0,
    NORMAL: 1
});

cc.Class({
    extends: cc.Component,

    properties: {
        phyObj: {
            default: null,
            visible: false
        },

        type: {
            type: BallType,
            default: BallType.NORMAL
        },

        // weight : {
        //     get: function () {
        //         if (this.type === BallType.CUE) {
        //             return Globals.instance.CUE_BALL_WEIGHT;
        //         }
        //         else {
        //             return Globals.instance.BALL_WEIGHT;
        //         }
        //     },
        //     readonly: true
        // },
        // maxSpeed : {
        //     get: function () {
        //         return Globals.instance.MAX_SPEED;
        //     },
        //     readonly: true
        // },
        // r : {
        //     get: function () {
        //         return Globals.instance.BALL_R;
        //     },
        //     readonly: true
        // },
        // friction : {
        //     get: function () {
        //         return Globals.instance.FRICTION;
        //     },
        //     readonly: true
        // },
        // elasticity : {
        //     get: function () {
        //         return Globals.instance.ELASTICITY;
        //     },
        //     readonly: true
        // },
    },

    onLoad: function() {
        if (this.type === BallType.CUE) {
            this.weight = Globals.instance.CUE_BALL_WEIGHT;
        }
        else {
            this.weight = Globals.instance.BALL_WEIGHT;
        } 
        this.maxSpeed = Globals.instance.MAX_SPEED;
        this.r = Globals.instance.BALL_R;
        this.friction = Globals.instance.FRICTION;
        this.elasticity = Globals.instance.ELASTICITY;
    },

    initPhysics : function () {
        var origin = this.node._sgNode.getPosition();

        var sprite = this.getComponent(cc.SpriteRenderer);

        this.phyObj = new Physics.CircleObject(this.weight, this.r, this.maxSpeed, sprite, origin);
        this.phyObj.setFriction(this.friction);
        this.phyObj.setElasticity(this.elasticity);
        // var body = this.phyObj.body;
        // body.setMoment(Infinity);
        // this.phyObj.shape.setCollisionType(Player.COL_TYPE);
    },

    // use this for initialization
    start: function () {
        this.initPhysics();
        var self = this;
        if (self.type !== BallType.CUE) return;
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ALL_AT_ONCE,
            onTouchesEnded: function(touches, event){
                // var sprite = self.getComponent(cc.SpriteRenderer)._sgNode;
                // var pos = touches[0].getLocation();
                // var s = sprite.getContentSize();

                // touch always kicks cue ball
                self.fire();

                Globals.instance.hideInstruction();

                // Stop propagation, so yellow blocks will not be able to receive event.
                event.stopPropagation();
            }
        }, this);
    },

    fire: function () {
        var impules = cp.v(-Globals.instance.IMPULSE, 0);
        this.phyObj.body.applyImpulse(impules, cp.v(0,0));
    },

    // called every frame
    update: function (dt) {
        var p = this.phyObj.getPosition();
        this.node.x = p.x;
        this.node.y = p.y;
    },
});
