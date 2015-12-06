var Physics = require('./physics');
var globals = new (require('./GlobalSettings'))();

var WallW = globals.WALL_WIDTH;
var WallElasticity = globals.WALL_ELASTICITY;
var WallFriction = globals.WALL_FRICTION;

cc.Class({
    extends: cc.Component,

    properties: {
        space: {
            default: null,
            visible: false
        },
        debugNode: {
            default: null,
            visible: false
        },
        leftWall: {
            default: null,
            visible: false
        },
        rightWall: {
            default: null,
            visible: false
        },
        topWall: {
            default: null,
            visible: false
        },
        bottomWall: {
            default: null,
            visible: false
        }
    },

    createPhysicsWorld : function () {
        Physics.init(cc.director.getRunningScene());
        this.space = Physics.world;
        // Gravity
        this.space.gravity = cp.v(0, 0);

        var w = cc.winSize.width, h = cc.winSize.height;
        this.leftWall = new Physics.StaticObject(0, 0, WallW, h, null);
        this.topWall = new Physics.StaticObject(0, h-50-WallW, w, WallW, null);
        this.rightWall = new Physics.StaticObject(w-WallW, 0, WallW, h, null);
        this.bottomWall = new Physics.StaticObject(0, 50, w, WallW, null);

        this.leftWall.setElasticity(WallElasticity);
        this.leftWall.setFriction(WallFriction);
        this.topWall.setElasticity(WallElasticity);
        this.topWall.setFriction(WallFriction);
        this.rightWall.setElasticity(WallElasticity);
        this.rightWall.setFriction(WallFriction);
        this.bottomWall.setElasticity(WallElasticity);
        this.bottomWall.setFriction(WallFriction);
    },
    setupDebugNode : function (){
        this.debugNode = cc.PhysicsDebugNode.create( this.space );
        this.debugNode.visible = true;

        var parent = this.node._sgNode;
        this.debugNode.setPosition(-parent.x, -parent.y);
        parent.addChild( this.debugNode, 100 );
    },

    // use this for initialization
    onLoad: function () {
        this.createPhysicsWorld();
        this.setupDebugNode();
    },

    // called every frame
    update: function (dt) {
        Physics.update(dt);
    },
});
