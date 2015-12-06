var globals = new (require('./GlobalSettings'))();
var Physics = require('./physics');

BallType = cc.Enum({
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

        _type: BallType.NORMAL,
        type: {
            default: BallType.NORMAL,
            type: cc.Enum,
            set: function (type) {
                this._type = type;
                if (type === BallType.CUE) {
                    this.weight = globals.CUE_BALL_WEIGHT;
                    this.phyObj.body.setMass(this.weight);
                }
            },
            get: function () {
                return this._type;
            }
        },

        weight : globals.BALL_WEIGHT,
        maxSpeed : globals.MAX_SPEED,
        r : globals.BALL_R,
        friction : globals.FRICTION,
        elasticity : globals.ELASTICITY,
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
    onLoad: function () {
        this.initPhysics();
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ALL_AT_ONCE,
            onTouchesEnded: function(touches, event){
                var sprite = self.getComponent(cc.SpriteRenderer)._sgNode;
                var pos = touches[0].getLocation();
                var s = sprite.getContentSize();
                if (cc.rectContainsPoint(cc.rect(0, 0, s.width, s.height), sprite.convertToNodeSpace(pos))) {
                    self.fire();
                }
                // Stop propagation, so yellow blocks will not be able to receive event.
                event.stopPropagation();
            }
        }, this);
    },

    fire: function () {
        var impules = cp.v(-globals.IMPULSE, 0);
        this.phyObj.body.applyImpulse(impules, cp.v(0,0));
    },

    // called every frame
    update: function (dt) {
        var p = this.phyObj.getPosition();
        this.node.x = p.x;
        this.node.y = p.y;
    },
});
