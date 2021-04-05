addLayer("p", {
    name: "prestige",
    symbol: "P",
    position: 0,
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
		dim1: new Decimal(0),
		dim2: new Decimal(0),
		dim3: new Decimal(0),
		dim4: new Decimal(0),
		dim5: new Decimal(0),
		dim6: new Decimal(0),
		dim7: new Decimal(0),
		dim8: new Decimal(0),
    }},
    color: "#00bfbf",
    requires: function(){
			return new Decimal(10);
	},
    resource: "prestige points",
    baseResource: "points", 
    baseAmount() {return player.points},
    type: "normal",
    exponent: 0.5,
    gainMult() {
		if(player.h.activeChallenge==22)return new Decimal(0);
        mult = new Decimal(1)
		if(hasUpgrade("b",11)) mult =  mult.mul(upgradeEffect("b",11))
		if(hasUpgrade("p",13)) mult =  mult.mul(upgradeEffect("p",13))
        if(hasUpgrade("g",12)) mult =  mult.mul(upgradeEffect("g",12))
		if(hasUpgrade("p",22)) mult =  mult.mul(upgradeEffect("p",22))
        if(hasUpgrade("p",23)) mult =  mult.mul(upgradeEffect("p",23))
		mult=mult.mul(tmp.t.getTimeEff);
		mult=mult.mul(tmp.s.buyables[12].effect);
		if(player.e.best.gte(100)) mult = mult.mul(tmp.e.buyables[11].effect[1]);
		if(hasUpgrade("e",11)) mult =  mult.mul(upgradeEffect("e",11))
		if(hasUpgrade("q",11)) mult =  mult.mul(upgradeEffect("q",11))
        return mult
    },
    gainExp() {
       return new Decimal(1);
    },
    row: 0,
	softcap: new Decimal(Infinity),
	softcapPower: new Decimal(1),
    hotkeys: [],
    layerShown(){return true},
	dimensionalBase:function(){
		let ret=new Decimal(2);
		if(hasUpgrade("p",44))ret=ret.add(upgradeEffect("p",44));
		return ret;
	},
	buyables: {
            rows: 4,
            cols: 2,
            11: {
                title: "1st Prestige Dimension", // Optional, displayed at the top in a larger font
                cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                    let cost = Decimal.pow(2, x.pow(1.35))
                    return cost
                },
                effect() {
                    return getPointGen();
                },
                display() { // Everything else displayed in the buyable button after the title
                    let data = tmp[this.layer].buyables[this.id]
                    return "You have "+format(player.p.dim1)+" 1st Prestige Dimensions. ("+format(player.p.buyables[11])+" bought)<br>"+
                    "They are producing "+format(data.effect)+" points per second.<br>"+
					"Cost for Next 1st Prestige Dimension: "+format(data.cost)+" prestige points";
                },
                unlocked() { return player[this.layer].unlocked }, 
                canAfford() {
                    return player[this.layer].points.gte(tmp[this.layer].buyables[this.id].cost)},
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
                    if(player.g.best.lt(12))player[this.layer].points = player[this.layer].points.sub(cost)	
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                    player[this.layer].spentOnBuyables = player[this.layer].spentOnBuyables.add(cost) // This is a built-in system that you can use for respeccing but it only works with a single Decimal value
					player.p.dim1 = player.p.dim1.add(1)
                },
                buyMax() {}, // You'll have to handle this yourself if you want
                style: {'height':'222px'},
            },
            12: {
                title: "2nd Prestige Dimension", // Optional, displayed at the top in a larger font
                cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                    if(!hasUpgrade("g",11))return Infinity;
					let cost = Decimal.pow(100, x.pow(1.35))
                    return cost
                },
                effect() {
					if(player.h.activeChallenge==11)return new Decimal(0);
					let gain=player.p.dim2;
					gain=gain.mul(Decimal.pow(tmp.p.dimensionalBase,player.p.buyables[12]));
					if(hasUpgrade("g",13))gain=gain.mul(upgradeEffect("g",13));
					if(hasUpgrade("g",22))gain=gain.mul(upgradeEffect("g",22));
					if(hasUpgrade("s",11))gain=gain.mul(upgradeEffect("s",11));
					if(hasUpgrade("s",12))gain=gain.mul(upgradeEffect("s",12));
					if(hasUpgrade("p",12)&&hasUpgrade("p",24))gain = gain.mul(upgradeEffect("p",24));
					if(hasUpgrade("q",11))gain=gain.mul(upgradeEffect("q",11));
					gain = gain.mul(tmp.q.quirkEff);
					return gain;
                },
                display() { // Everything else displayed in the buyable button after the title
					if(!hasUpgrade("g",11))return "Req: Generator Upgrade 11";
                    let data = tmp[this.layer].buyables[this.id]
                    return "You have "+format(player.p.dim2)+" 2nd Prestige Dimensions. ("+format(player.p.buyables[12])+" bought)<br>"+
                    "They are producing "+format(data.effect)+" 1st Prestige Dimensions per second.<br>"+
					"Cost for Next 2nd Prestige Dimension: "+format(data.cost)+" prestige points";
                },
                unlocked() { return player[this.layer].unlocked }, 
                canAfford() {
                    return player[this.layer].points.gte(tmp[this.layer].buyables[this.id].cost)},
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
                    if(player.g.best.lt(12))player[this.layer].points = player[this.layer].points.sub(cost)	
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                    player[this.layer].spentOnBuyables = player[this.layer].spentOnBuyables.add(cost) // This is a built-in system that you can use for respeccing but it only works with a single Decimal value
					player.p.dim2 = player.p.dim2.add(1)
                },
                buyMax() {}, // You'll have to handle this yourself if you want
                style: {'height':'222px'},
                
            },
            21: {
                title: "3rd Prestige Dimension", // Optional, displayed at the top in a larger font
                cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                    if(!hasUpgrade("e",23))return Infinity;
					let cost = Decimal.pow(1e4, x.pow(1.35))
                    return cost
                },
                effect() {
					let gain=player.p.dim3;
					gain=gain.mul(Decimal.pow(tmp.p.dimensionalBase,player.p.buyables[21]));
					if(hasUpgrade("p",12)&&hasUpgrade("p",24))gain = gain.mul(upgradeEffect("p",24));
					if(hasUpgrade("q",11))gain=gain.mul(upgradeEffect("q",11));
					gain = gain.mul(tmp.q.quirkEff);
					return gain;
                },
                display() { // Everything else displayed in the buyable button after the title
					if(!hasUpgrade("e",23))return "Req: Enhance Upgrade 23";
                    let data = tmp[this.layer].buyables[this.id]
                    return "You have "+format(player.p.dim3)+" 3rd Prestige Dimensions. ("+format(player.p.buyables[21])+" bought)<br>"+
                    "They are producing "+format(data.effect)+" 2nd Prestige Dimensions per second.<br>"+
					"Cost for Next 3rd Prestige Dimension: "+format(data.cost)+" prestige points";
                },
                unlocked() { return player.e.unlocked }, 
                canAfford() {
                    return player[this.layer].points.gte(tmp[this.layer].buyables[this.id].cost)},
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
                    if(player.g.best.lt(12))player[this.layer].points = player[this.layer].points.sub(cost)	
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                    player[this.layer].spentOnBuyables = player[this.layer].spentOnBuyables.add(cost) // This is a built-in system that you can use for respeccing but it only works with a single Decimal value
					player.p.dim3 = player.p.dim3.add(1)
                },
                buyMax() {}, // You'll have to handle this yourself if you want
                style: {'height':'222px'},
                
            },
            22: {
                title: "4th Prestige Dimension", // Optional, displayed at the top in a larger font
                cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                    if(player.h.challenges[11]<1)return Infinity;
					let cost = Decimal.pow(1e8, x.pow(1.35))
                    return cost
                },
                effect() {
					let gain=player.p.dim4;
					gain=gain.mul(Decimal.pow(tmp.p.dimensionalBase,player.p.buyables[22]));
					if(hasUpgrade("p",12)&&hasUpgrade("p",24))gain = gain.mul(upgradeEffect("p",24));
					if(hasUpgrade("q",11))gain=gain.mul(upgradeEffect("q",11));
					gain = gain.mul(tmp.q.quirkEff);
					return gain;
                },
                display() { // Everything else displayed in the buyable button after the title
					if(player.h.challenges[11]<1)return "Req: Complete H challenge 1";
                    let data = tmp[this.layer].buyables[this.id]
                    return "You have "+format(player.p.dim4)+" 4th Prestige Dimensions. ("+format(player.p.buyables[22])+" bought)<br>"+
                    "They are producing "+format(data.effect)+" 3rd Prestige Dimensions per second.<br>"+
					"Cost for Next 4th Prestige Dimension: "+format(data.cost)+" prestige points";
                },
                unlocked() { return player.h.unlocked }, 
                canAfford() {
                    return player[this.layer].points.gte(tmp[this.layer].buyables[this.id].cost)},
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
                    if(player.g.best.lt(12))player[this.layer].points = player[this.layer].points.sub(cost)	
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                    player[this.layer].spentOnBuyables = player[this.layer].spentOnBuyables.add(cost) // This is a built-in system that you can use for respeccing but it only works with a single Decimal value
					player.p.dim4 = player.p.dim4.add(1)
                },
                buyMax() {}, // You'll have to handle this yourself if you want
                style: {'height':'222px'},
                
            },
            31: {
                title: "5th Prestige Dimension", // Optional, displayed at the top in a larger font
                cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                    if(player.h.challenges[11]<2)return Infinity;
					let cost = Decimal.pow(1e16, x.pow(1.35))
                    return cost
                },
                effect() {
					let gain=player.p.dim5;
					gain=gain.mul(Decimal.pow(tmp.p.dimensionalBase,player.p.buyables[31]));
					if(hasUpgrade("p",12)&&hasUpgrade("p",24))gain = gain.mul(upgradeEffect("p",24));
					if(hasUpgrade("q",11))gain=gain.mul(upgradeEffect("q",11));
					gain = gain.mul(tmp.q.quirkEff);
					return gain;
                },
                display() { // Everything else displayed in the buyable button after the title
					if(player.h.challenges[11]<2)return "Req: Complete H challenge 1 2 times";
                    let data = tmp[this.layer].buyables[this.id]
                    return "You have "+format(player.p.dim5)+" 5th Prestige Dimensions. ("+format(player.p.buyables[31])+" bought)<br>"+
                    "They are producing "+format(data.effect)+" 4th Prestige Dimensions per second.<br>"+
					"Cost for Next 5th Prestige Dimension: "+format(data.cost)+" prestige points";
                },
                unlocked() { return player.h.unlocked }, 
                canAfford() {
                    return player[this.layer].points.gte(tmp[this.layer].buyables[this.id].cost)},
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
                    if(player.g.best.lt(12))player[this.layer].points = player[this.layer].points.sub(cost)	
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                    player[this.layer].spentOnBuyables = player[this.layer].spentOnBuyables.add(cost) // This is a built-in system that you can use for respeccing but it only works with a single Decimal value
					player.p.dim5 = player.p.dim5.add(1)
                },
                buyMax() {}, // You'll have to handle this yourself if you want
                style: {'height':'222px'},
                
            },
            32: {
                title: "6th Prestige Dimension", // Optional, displayed at the top in a larger font
                cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                    if(player.h.challenges[11]<3)return Infinity;
					let cost = Decimal.pow(1e32, x.pow(1.35))
                    return cost
                },
                effect() {
					let gain=player.p.dim6;
					gain=gain.mul(Decimal.pow(tmp.p.dimensionalBase,player.p.buyables[32]));
					if(hasUpgrade("p",12)&&hasUpgrade("p",24))gain = gain.mul(upgradeEffect("p",24));
					if(hasUpgrade("q",11))gain=gain.mul(upgradeEffect("q",11));
					gain = gain.mul(tmp.q.quirkEff);
					return gain;
                },
                display() { // Everything else displayed in the buyable button after the title
					if(player.h.challenges[11]<3)return "Req: Complete H challenge 1 3 times";
                    let data = tmp[this.layer].buyables[this.id]
                    return "You have "+format(player.p.dim6)+" 6th Prestige Dimensions. ("+format(player.p.buyables[32])+" bought)<br>"+
                    "They are producing "+format(data.effect)+" 5th Prestige Dimensions per second.<br>"+
					"Cost for Next 6th Prestige Dimension: "+format(data.cost)+" prestige points";
                },
                unlocked() { return player.h.unlocked }, 
                canAfford() {
                    return player[this.layer].points.gte(tmp[this.layer].buyables[this.id].cost)},
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
                    if(player.g.best.lt(12))player[this.layer].points = player[this.layer].points.sub(cost)	
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                    player[this.layer].spentOnBuyables = player[this.layer].spentOnBuyables.add(cost) // This is a built-in system that you can use for respeccing but it only works with a single Decimal value
					player.p.dim6 = player.p.dim6.add(1)
                },
                buyMax() {}, // You'll have to handle this yourself if you want
                style: {'height':'222px'},
                
            },
            41: {
                title: "7th Prestige Dimension", // Optional, displayed at the top in a larger font
                cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                    if(player.h.challenges[11]<4)return Infinity;
					let cost = Decimal.pow(1e64, x.pow(1.35))
                    return cost
                },
                effect() {
					let gain=player.p.dim7;
					gain=gain.mul(Decimal.pow(tmp.p.dimensionalBase,player.p.buyables[41]));
					if(hasUpgrade("p",12)&&hasUpgrade("p",24))gain = gain.mul(upgradeEffect("p",24));
					if(hasUpgrade("q",11))gain=gain.mul(upgradeEffect("q",11));
					gain = gain.mul(tmp.q.quirkEff);
					return gain;
                },
                display() { // Everything else displayed in the buyable button after the title
					if(player.h.challenges[11]<4)return "Req: Complete H challenge 1 4 times";
                    let data = tmp[this.layer].buyables[this.id]
                    return "You have "+format(player.p.dim7)+" 7th Prestige Dimensions. ("+format(player.p.buyables[41])+" bought)<br>"+
                    "They are producing "+format(data.effect)+" 6th Prestige Dimensions per second.<br>"+
					"Cost for Next 7th Prestige Dimension: "+format(data.cost)+" prestige points";
                },
                unlocked() { return player.h.unlocked }, 
                canAfford() {
                    return player[this.layer].points.gte(tmp[this.layer].buyables[this.id].cost)},
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
                    if(player.g.best.lt(12))player[this.layer].points = player[this.layer].points.sub(cost)	
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                    player[this.layer].spentOnBuyables = player[this.layer].spentOnBuyables.add(cost) // This is a built-in system that you can use for respeccing but it only works with a single Decimal value
					player.p.dim7 = player.p.dim7.add(1)
                },
                buyMax() {}, // You'll have to handle this yourself if you want
                style: {'height':'222px'},
                
            },
            42: {
                title: "8th Prestige Dimension", // Optional, displayed at the top in a larger font
                cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                    if(player.h.challenges[11]<5)return Infinity;
					let cost = Decimal.pow(1e128, x.pow(1.35))
                    return cost
                },
                effect() {
					let gain=player.p.dim8;
					gain=gain.mul(Decimal.pow(tmp.p.dimensionalBase,player.p.buyables[42]));
					if(hasUpgrade("p",12)&&hasUpgrade("p",24))gain = gain.mul(upgradeEffect("p",24));
					if(hasUpgrade("q",11))gain=gain.mul(upgradeEffect("q",11));
					gain = gain.mul(tmp.q.quirkEff);
					return gain;
                },
                display() { // Everything else displayed in the buyable button after the title
					if(player.h.challenges[11]<5)return "Req: Complete H challenge 1 5 times";
                    let data = tmp[this.layer].buyables[this.id]
                    return "You have "+format(player.p.dim8)+" 8th Prestige Dimensions. ("+format(player.p.buyables[42])+" bought)<br>"+
                    "They are producing "+format(data.effect)+" 7th Prestige Dimensions per second.<br>"+
					"Cost for Next 8th Prestige Dimension: "+format(data.cost)+" prestige points";
                },
                unlocked() { return player.h.unlocked }, 
                canAfford() {
                    return player[this.layer].points.gte(tmp[this.layer].buyables[this.id].cost)},
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
                    if(player.g.best.lt(12))player[this.layer].points = player[this.layer].points.sub(cost)	
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                    player[this.layer].spentOnBuyables = player[this.layer].spentOnBuyables.add(cost) // This is a built-in system that you can use for respeccing but it only works with a single Decimal value
					player.p.dim8 = player.p.dim8.add(1)
                },
                buyMax() {}, // You'll have to handle this yourself if you want
                style: {'height':'222px'},
                
            },
        },
		upgrades: {
            rows: 5,
            cols: 4,
			11: {
				title: "Prestige Upgrade 11",
                description: "Point generation is faster based on your unspent Prestige Points.",
                cost: new Decimal(20),
                unlocked() { return true; }, // The upgrade is only visible when this is true
				effect() { // Calculate bonuses from the upgrade. Can return a single value or an object with multiple values
					let base=3;
					if(hasUpgrade("g",21))base+=0.2;
                    let ret = Decimal.pow(base,Decimal.log10(player[this.layer].points.add(1)).pow(0.9))
					if(ret.lt(10000))ret=ret.pow(3/4).mul(10);
                    //if (ret.gte("1e20000000")) ret = ret.sqrt().times("1e10000000")
                    return ret;
                },
                effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
            },
			12: {
				title: "Prestige Upgrade 12",
                description: "Point generation is faster based on your Point amount.",
                cost: new Decimal(10000),
                unlocked() { return player.b.unlocked || player.g.unlocked  },
				effect() { // Calculate bonuses from the upgrade. Can return a single value or an object with multiple values
					let base=1.25;
					if(hasUpgrade("b",31))base+=0.2;
                    let ret = Decimal.pow(base,Decimal.log10(player.points.add(1)).pow(0.9))
                    //if (ret.gte("1e20000000")) ret = ret.sqrt().times("1e10000000")
                    return ret;
                },
                effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
            },
			13: {
				title: "Prestige Upgrade 13",
                description: "Gain More Prestige Points.",
                cost: new Decimal(2e6),
                unlocked() { return player.b.unlocked || player.g.unlocked  },
				effect() { // Calculate bonuses from the upgrade. Can return a single value or an object with multiple values
                    let ret = new Decimal(2);
					if(hasUpgrade("p",14)){
						let base=new Decimal(1e100);
						ret = ret.mul(Decimal.pow(base,Decimal.log10(player.h.points.add(1)).pow(0.9)));
						return ret;
					}
                    return ret;
                },
                effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
            },
			21: {
				title: "Prestige Upgrade 21",
				description: "Point generation is faster based on your Prestige Upgrades bought.",
				cost: new Decimal(1e20),
				unlocked(){ return player.b.unlocked&&player.g.unlocked },
				effect() {
					let len = player.p.upgrades.length;
					if(len>12)len=12+Math.pow(len-12,0.1);
					let ret = Decimal.pow(2, len);
					if(hasUpgrade("p",31))ret = Decimal.pow(2, ret);
					return ret;
				},
				effectDisplay() { return format(this.effect())+"x" },
			},
			22: {
				title: "Prestige Upgrade 22",
				description:  "Prestige Point gain is boosted by your Point amount.",
				cost: new Decimal(1e25),
				unlocked(){ return player.b.unlocked&&player.g.unlocked  },
				effect(){ 
					let base=1.05;
					if(hasUpgrade("g",31))base+=0.2;
					if(hasUpgrade("p",32))base+=0.2;
					if(hasUpgrade("p",42))base+=0.2;
					let ret = Decimal.pow(base,Decimal.log10(player.points.add(1)).pow(0.9))
					return ret;
				},
				effectDisplay() { return format(this.effect())+"x" },
			},
			23: {
				title: "Prestige Upgrade 23",
				description:  "Prestige Point gain is boosted by your Prestige Point amount.",
				cost: new Decimal(1e30),
				unlocked(){ return player.b.unlocked&&player.g.unlocked  },
				effect(){
					let base=1.05;
					if(hasUpgrade("p",33))base+=0.2;
					if(hasUpgrade("p",41))base+=0.2;
					if(hasUpgrade("p",43))base+=0.2;
					let ret = Decimal.pow(base,Decimal.log10(player.p.points.add(1)).pow(0.9))
					return ret;
				},
				effectDisplay() { return format(this.effect())+"x" },
			},
			31: {
				title: "Prestige Upgrade 31",
				description: "The upgrade above is stronger.",
				cost: new Decimal("1e560"),
				unlocked() { return player.t.unlocked&&player.s.unlocked },
			},
			32: {
				title: "Prestige Upgrade 32",
				description: "The upgrade above is stronger.",
				cost: new Decimal("1e650"),
				unlocked() { return player.t.unlocked&&player.s.unlocked },
			},
			33: {
				title: "Prestige Upgrade 33",
				description: "The upgrade above is stronger.",
				cost: new Decimal("1e840"),
				unlocked() { return player.t.unlocked&&player.s.unlocked },
			},
			41: {
				title: "Prestige Upgrade 41",
				description: "Prestige Upgrade 23 is stronger.",
				cost: new Decimal("1e2820"),
				unlocked() { return player.e.unlocked },
			},
			42: {
				title: "Prestige Upgrade 42",
				description: "Prestige Upgrade 22 is stronger.",
				cost: new Decimal("1e4590"),
				unlocked() { return player.e.unlocked },
			},
			43: {
				title: "Prestige Upgrade 43",
				description: "Prestige Upgrade 23 is stronger.",
				cost: new Decimal("1e9600"),
				unlocked() { return player.e.unlocked },
			},
			14: {
				title: "Prestige Upgrade 14",
				description: "Boost the left upgrade based on Hindrance Spirit.",
				cost: new Decimal("1e31400"),
				unlocked() { return player.h.challenges[22]>=1 },
			},
			24: {
				title: "Prestige Upgrade 24",
				description: "Prestige Upgrade 12 affects all other Prestige Dimensions at a reduced rate.",
				cost: new Decimal("1e79200"),
				unlocked() { return player.h.challenges[22]>=2 },
				effect(){
					if(hasUpgrade("p",34))return upgradeEffect("p",12).pow(0.1);
					return upgradeEffect("p",12).pow(0.05);
				},
				
				effectDisplay() { return format(this.effect())+"x" },
			},
			34: {
				title: "Prestige Upgrade 34",
				description: "The upgrade above is stronger.",
				cost: new Decimal("1e150000"),
				unlocked() { return player.h.challenges[22]>=3 },
			},
			44: {
				title: "Prestige Upgrade 44",
				description: "Dimensional base on this layer is boosted by your prestige points.",
				cost: new Decimal("1e500000"),
				unlocked() { return player.h.challenges[22]>=4 },
				effect(){
					return player.p.points.add(1).log10().add(1).log10().add(1).log10();
				},
				effectDisplay() { return "+"+format(this.effect())+" to the base" },
			},
		},
	tabFormat: ["main-display",
                    "prestige-button", "resource-display",
                    ["blank", "5px"],
					["display-text",function(){return "Dimensional Base: "+format(tmp.p.dimensionalBase)}],
					"buyables",
                   "upgrades"],
				   
		doReset(l){
			if(l=="p"){return;}
			if(l=="b" || l=="g"){
				if(player[l].best.lt(10))layerDataReset("p",[]);
				else layerDataReset("p",["upgrades"]);
				return;
			}
			if(l=="t" || l=="s" || l=="e" || l=="sb" || l=="sg"){
				if(player[l].best.lt(2) && l!="e" && l!="sb" && l!="sg")layerDataReset("p",[]);
				else layerDataReset("p",["upgrades"]);
				return;
			}
			if(l=="h" || l=="q" || l=="ss"){
				layerDataReset("p",["upgrades"]);
				return;
			}
			layerDataReset("p",[]);
		},
		
		update(diff){
			if(player.g.best.gte(16)){
				var target=player.p.points.add(1).log(2).pow(1/1.35).add(1).floor();
				if(target.gt(player.p.buyables[11])){
					player.p.dim1=player.p.dim1.add(target.sub(player.p.buyables[11]));
					player.p.buyables[11]=target;
				}
				
				if(hasUpgrade("g",11)){
					target=player.p.points.add(1).log(100).pow(1/1.35).add(1).floor();
					if(target.gt(player.p.buyables[12])){
						player.p.dim2=player.p.dim2.add(target.sub(player.p.buyables[12]));
						player.p.buyables[12]=target;
					}
				}
				
				if(hasUpgrade("e",23)){
					target=player.p.points.add(1).log(1e4).pow(1/1.35).add(1).floor();
					if(target.gt(player.p.buyables[21])){
						player.p.dim3=player.p.dim3.add(target.sub(player.p.buyables[21]));
						player.p.buyables[21]=target;
					}
				}
				
				if(player.h.challenges[11]>=1){
					target=player.p.points.add(1).log(1e8).pow(1/1.35).add(1).floor();
					if(target.gt(player.p.buyables[22])){
						player.p.dim4=player.p.dim4.add(target.sub(player.p.buyables[22]));
						player.p.buyables[22]=target;
					}
				}
				
				if(player.h.challenges[11]>=2){
					target=player.p.points.add(1).log(1e16).pow(1/1.35).add(1).floor();
					if(target.gt(player.p.buyables[31])){
						player.p.dim5=player.p.dim5.add(target.sub(player.p.buyables[31]));
						player.p.buyables[31]=target;
					}
				}
				
				if(player.h.challenges[11]>=3){
					target=player.p.points.add(1).log(1e32).pow(1/1.35).add(1).floor();
					if(target.gt(player.p.buyables[32])){
						player.p.dim6=player.p.dim6.add(target.sub(player.p.buyables[32]));
						player.p.buyables[32]=target;
					}
				}
				
				if(player.h.challenges[11]>=4){
					target=player.p.points.add(1).log(1e64).pow(1/1.35).add(1).floor();
					if(target.gt(player.p.buyables[41])){
						player.p.dim7=player.p.dim7.add(target.sub(player.p.buyables[41]));
						player.p.buyables[41]=target;
					}
				}
				
				if(player.h.challenges[11]>=5){
					target=player.p.points.add(1).log(1e128).pow(1/1.35).add(1).floor();
					if(target.gt(player.p.buyables[42])){
						player.p.dim8=player.p.dim8.add(target.sub(player.p.buyables[42]));
						player.p.buyables[42]=target;
					}
				}
			}
			if(hasUpgrade("g",11)){
				player.p.dim1=player.p.dim1.add(tmp.p.buyables[12].effect.mul(diff));
			}
			if(hasUpgrade("e",23)){
				player.p.dim2=player.p.dim2.add(tmp.p.buyables[21].effect.mul(diff));
			}
			if(player.h.challenges[11]>=1){
				player.p.dim3=player.p.dim3.add(tmp.p.buyables[22].effect.mul(diff));
			}
			if(player.h.challenges[11]>=2){
				player.p.dim4=player.p.dim4.add(tmp.p.buyables[31].effect.mul(diff));
			}
			if(player.h.challenges[11]>=3){
				player.p.dim5=player.p.dim5.add(tmp.p.buyables[32].effect.mul(diff));
			}
			if(player.h.challenges[11]>=4){
				player.p.dim6=player.p.dim6.add(tmp.p.buyables[41].effect.mul(diff));
			}
			if(player.h.challenges[11]>=5){
				player.p.dim7=player.p.dim7.add(tmp.p.buyables[42].effect.mul(diff));
			}
	 },
	 
	 passiveGeneration(){
		 if(player.g.best.gte(14))return 1;
		 return 0;
	 },
	 hotkeys: [
           {key: "p", description: "P: Prestige reset", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
     ],
})

addLayer("b", {
    name: "booster",
    symbol: "B",
    position: 0,
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
		boost: new Decimal(0),
		dim1: new Decimal(0),
		dim2: new Decimal(0),
		dim3: new Decimal(0),
		dim4: new Decimal(0),
		dim5: new Decimal(0),
		dim6: new Decimal(0),
		dim7: new Decimal(0),
		dim8: new Decimal(0),
    }},
    color: "#415a9e",
    requires: function(){
		if(!player.b.unlocked && player.g.unlocked)return new Decimal(1e13);
		return new Decimal(1e6);
	},
    resource: "boosters",
    baseResource: "points", 
    baseAmount() {return player.points},
    type: "static",
	base: 5,
    exponent: 1.25,
    gainMult() {
        mult = new Decimal(1)
		if(hasUpgrade("b",23)) mult =  mult.div(upgradeEffect("b",23))
        mult=mult.div(tmp.s.buyables[13].effect);
        return mult
    },
    gainExp() {
        return new Decimal(1)
    },
    row: 1,
    hotkeys: [],
    layerShown(){return hasUpgrade("p",11) || player.b.unlocked || player.g.unlocked},
	branches: ["p"],
	effect() {
			if(player.h.activeChallenge==31)return new Decimal(1);
			let ret = player.b.points.add(2).sub(Decimal.pow(0.5,player.b.points.sub(1)));
			let base = new Decimal(2);
			if(hasUpgrade("b",12))base = base.add(upgradeEffect("b",12))
			if(hasUpgrade("b",13))base = base.add(upgradeEffect("b",13))
			if(hasUpgrade("t",12))base = base.add(upgradeEffect("t",12))
			if(player.e.best.gte(5000))base = base.add(tmp.e.buyables[11].effect[2])
			if(hasUpgrade("t",23))base = base.add(tmp.b.boostEffect);
			ret = Decimal.pow(base,ret);
			return ret;
		},
	effectDescription() { // Optional text to describe the effects
           eff = this.effect();
           return "translated to a "+format(eff)+"x multiplier to point gain"
       },
	   upgrades: {
            rows: 4,
            cols: 4,
			11: {
				title: "Booster Upgrade 11",
                description: "Boosters boost Prestige Point gain.",
                cost: new Decimal(4),
                unlocked() { return player.b.unlocked }, // The upgrade is only visible when this is true
				effect() { // Calculate bonuses from the upgrade. Can return a single value or an object with multiple values
                    let ret = player.b.points.add(2).pow(hasUpgrade("b",32)?3:1);
                    if(hasUpgrade("b",41))ret=ret.mul(Decimal.pow(1.1,player.b.points.mul(hasUpgrade("b",32)?3:1)));
                    return ret;
                },
                effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
            },
			12: {
				title: "Booster Upgrade 12",
                description: "Non-extra Generators add to the Booster effect.",
                cost: new Decimal(15),
                unlocked() { return player.b.unlocked && player.g.unlocked}, // The upgrade is only visible when this is true
				effect() { // Calculate bonuses from the upgrade. Can return a single value or an object with multiple values
                    let ret = player.g.points.add(1).log10().sqrt().div(3);
					if(hasUpgrade("b",42))ret = player.g.points.sqrt();
                    return ret;
                },
                effectDisplay() { return "+"+format(this.effect())+" to base" }, // Add formatting to the effect
            },
			13: {
				title: "Booster Upgrade 13",
				description: "Prestige Points add to the Booster effect.",
				cost: new Decimal(18),
				unlocked() { return player.b.best.gte(15) },
				effect() { 
					let ret = player.p.points.add(1).log10().add(1).log10().div(3);
                    return ret;
				},
				effectDisplay() { return "+"+format(this.effect())+" to base" },
			},
			21: {
				title: "Booster Upgrade 21",
				description: "Square the Generator Power effect.",
				cost: new Decimal(24),
				unlocked() { return player.b.upgrades.includes(11) && player.b.upgrades.includes(12) },
			},
			22: {
				title: "Booster Upgrade 22",
				description: "The Generator Power effect is raised to the power of 1.2.",
				cost: new Decimal(30),
				unlocked() { return player.b.upgrades.includes(12) && player.b.upgrades.includes(13) },
			},
			23: {
				title: "Booster Upgrade 23",
				description: "Boosters are cheaper based on your points.",
				cost: new Decimal(35),
				unlocked() { return player.b.upgrades.includes(21) || player.b.upgrades.includes(22) },
				effect() { 
					let ret= player.points.add(1).log10().add(1).pow(3.2).pow(tmp.s.buyables[14].effect);
					
					return ret;
				},
				effectDisplay() { return "/"+format(this.effect()) },
			},
			31: {
				title: "Booster Upgrade 31",
				description: "Prestige Upgrade 12 is boosted.",
				cost: new Decimal(50),
				unlocked() { return player.t.unlocked },
			},
			32: {
				title: "Booster Upgrade 32",
				description: "Booster Upgrade 11's effect is cubed.",
				cost: new Decimal(58),
				unlocked() { return player.t.unlocked },
			},
			33: {
				title: "Booster Upgrade 33",
				description: "Boosters boost Time Energy gain.",
				cost: new Decimal(99),
				unlocked() { return player.t.unlocked },
				effect() { 
					let ret=player.b.points.add(2).pow(1.5)
					if(hasUpgrade("b",42))ret = ret.mul(Decimal.pow(1.01,player.b.points));
					return ret;
				},
				effectDisplay() { return format(this.effect())+"x" },
			},
			41: {
				title: "Booster Upgrade 41",
				description: "Booster Upgrade 11 uses a better formula.",
				cost: new Decimal(5200),
				unlocked() { return player.h.challenges[12]>=1 },
			},
			42: {
				title: "Booster Upgrade 42",
				description: "Booster Upgrade 12 uses a better formula.",
				cost: new Decimal(13400),
				unlocked() { return player.h.challenges[12]>=2 },
			},
			43: {
				title: "Booster Upgrade 43",
				description: "Booster Boost effect is boosted by your Prestige Points.",
				cost: new Decimal(22000),
				unlocked() { return hasUpgrade("sb",13) },
				effect() { 
					let ret = player.p.points.add(1).log10().add(1).log10().div(50).add(1);
					return ret;
				},
				effectDisplay() { return format(this.effect())+"x" },
			},
			14: {
				title: "Booster Upgrade 14",
				description: "Booster Boost effect is boosted by your Boosters.",
				cost: new Decimal(45000),
				unlocked() { return hasUpgrade("sb",13) },
				effect() { 
					let ret = player.b.points.add(1).log10().pow(0.1).div(10).add(1);
					return ret;
				},
				effectDisplay() { return format(this.effect())+"x" },
			},
			24: {
				title: "Booster Upgrade 24",
				description: "Booster Upgrade 33 uses a better formula.",
				cost: new Decimal(170000),
				unlocked() { return player.h.challenges[12]>=3 },
			},
		},
		milestones: {
            0: {requirementDescription: "10 Boosters",
                done() {return player[this.layer].best.gte(10)}, // Used to determine when to give the milestone
                effectDescription: "Keep Prestige Upgrades on reset",
            },
			1: {requirementDescription: "20 Boosters",
                done() {return player[this.layer].best.gte(20)},
                effectDescription: "You can buy max Boosters",
            },
		},
		canBuyMax() {return player[this.layer].best.gte(20)},
	doReset(l){
			if(l=="b" || l=="g"){return;}
			if(l=="t" || l=="s" || l=="e" || l=="sb" || l=="h" || l=="q" || l=="sg" || l=="ss"){
				if(player[l].best.gte(2) || l=="e" || l=="sb" || l=="h" || l=="q" || l=="sg" || l=="ss"){
					var b=new Decimal(player.b.best);
					if(player.t.best.gte(3))layerDataReset("b",["upgrades"]);
					else layerDataReset("b",[]);
					player.b.best=b;
				}
				else if(player.t.best.gte(3))layerDataReset("b",["upgrades"]);
				else layerDataReset("b",[]);
				return;
			}
			layerDataReset("b",[]);
		},
		milestonePopups(){
			if(player.h.best.gte(1))return false;
		 if(player.t.best.gte(2) || player.s.best.gte(2))return false;
		 return true;
	 },
	 autoPrestige(){
		 return player.t.best.gte(9);
	 },resetsNothing(){
		 return player.t.best.gte(9);
	 },boostEffect(){
		 let effect=Decimal.log10(player.b.boost.add(1)).div(3.6).mul(tmp.sb.effect);
		 if(player.e.best.gte("1e1000") && tmp.e.buyables[11].effect[2])effect=effect.mul(tmp.e.buyables[11].effect[4]);
		 if(hasUpgrade("b",43))effect=effect.mul(upgradeEffect("b",43));
		 if(hasUpgrade("b",14))effect=effect.mul(upgradeEffect("b",14));
		 return effect;
	 },
	 	 tabFormat: ["main-display",
                    "prestige-button", "resource-display",
                    ["blank", "5px"],
					["display-text",
                        function() {if(hasUpgrade("t",23))return 'You have ' + format(player.b.boost) + ' Booster Boosts, which adds Booster base by ' + format(tmp.b.boostEffect);return ""},
                        {}],
						"buyables",
						"milestones",
                   "upgrades"],
	 hotkeys: [
           {key: "b", description: "B: Booster reset", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
     ],
	 update(diff){
		 if(hasUpgrade("t",23))player.b.boost = player.b.boost.add(tmp.b.buyables[11].effect.times(diff)).max(0)
		 if(player.h.challenges[12]>=1)player.b.dim1 = player.b.dim1.add(tmp.b.buyables[12].effect.times(diff)).max(0)
		 if(player.h.challenges[12]>=2)player.b.dim2 = player.b.dim2.add(tmp.b.buyables[21].effect.times(diff)).max(0)
		 if(player.h.challenges[12]>=3)player.b.dim3 = player.b.dim3.add(tmp.b.buyables[22].effect.times(diff)).max(0)
			 if(player.t.best.gte(25)){
				if(hasUpgrade("t",23)){
					var target=player.t.energy.add(1).log(100).pow(1/1.35).add(1).floor();
					if(target.gt(player.b.buyables[11])){
						player.b.dim1=player.b.dim1.add(target.sub(player.b.buyables[11]));
						player.b.buyables[11]=target;
					}
				}
				if(player.h.challenges[12]>=1){
					var target=player.t.energy.add(1).log(1e10).pow(1/1.35).add(1).floor();
					if(target.gt(player.b.buyables[12])){
						player.b.dim2=player.b.dim2.add(target.sub(player.b.buyables[12]));
						player.b.buyables[12]=target;
					}
				}
				if(player.h.challenges[12]>=2){
					var target=player.t.energy.add(1).log(1e50).pow(1/1.35).add(1).floor();
					if(target.gt(player.b.buyables[21])){
						player.b.dim3=player.b.dim3.add(target.sub(player.b.buyables[21]));
						player.b.buyables[21]=target;
					}
				}
				if(player.h.challenges[12]>=3){
					var target=player.t.energy.add(1).log(1e250).pow(1/1.35).add(1).floor();
					if(target.gt(player.b.buyables[22])){
						player.b.dim4=player.b.dim4.add(target.sub(player.b.buyables[22]));
						player.b.buyables[22]=target;
					}
				}
			}
	 },
	buyables: {
            rows: 2,
            cols: 2,
            11: {
                title: "1st Booster Dimension", // Optional, displayed at the top in a larger font
                cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                    if(!hasUpgrade("t",23))return Infinity;
					let cost = Decimal.pow(100, x.pow(1.35))
                    return cost
                },
                effect() {
					if(player.h.activeChallenge==12)return new Decimal(0);
					let gain=player.b.dim1;
					gain=gain.mul(Decimal.pow(2,player.b.buyables[11]));
					if(hasUpgrade("sb",12))gain=gain.mul(upgradeEffect("sb",12));
					if(hasUpgrade("t",33))gain=gain.mul(upgradeEffect("t",33));
					return gain;
                },
                display() { // Everything else displayed in the buyable button after the title
                    if(!hasUpgrade("t",23))return "Req: Time Upgrade 23";
					let data = tmp[this.layer].buyables[this.id]
                    return "You have "+format(player.b.dim1)+" 1st Booster Dimensions. ("+format(player.b.buyables[11])+" bought)<br>"+
                    "They are producing "+format(data.effect)+" booster boosts per second.<br>"+
					"Cost for Next 1st Booster Dimension: "+format(data.cost)+" Time Energy";
                },
                unlocked() { return player.e.unlocked }, 
                canAfford() {
                    return player.t.energy.gte(tmp[this.layer].buyables[this.id].cost)},
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
                    if(player.t.points.lt(25))player.t.energy = player.t.energy.sub(cost)	
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                    player.b.dim1 = player.b.dim1.add(1)
                },
                buyMax() {}, // You'll have to handle this yourself if you want
                style: {'height':'222px'},
            },
            12: {
                title: "2nd Booster Dimension", // Optional, displayed at the top in a larger font
                cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                    if(player.h.challenges[12]<1)return Infinity;
					let cost = Decimal.pow(1e10, x.pow(1.35))
                    return cost
                },
                effect() {
					let gain=player.b.dim2;
					gain=gain.mul(Decimal.pow(2,player.b.buyables[12]));
					if(hasUpgrade("sb",12))gain=gain.mul(upgradeEffect("sb",12));
					if(hasUpgrade("t",33))gain=gain.mul(upgradeEffect("t",33));
					return gain;
                },
                display() { // Everything else displayed in the buyable button after the title
                    if(player.h.challenges[12]<1)return "Req: Complete H challenge 2";
					let data = tmp[this.layer].buyables[this.id]
                    return "You have "+format(player.b.dim2)+" 2nd Booster Dimensions. ("+format(player.b.buyables[12])+" bought)<br>"+
                    "They are producing "+format(data.effect)+" 1st Booster Dimensions per second.<br>"+
					"Cost for Next 2nd Booster Dimension: "+format(data.cost)+" Time Energy";
                },
                unlocked() { return player.h.unlocked }, 
                canAfford() {
                    return player.t.energy.gte(tmp[this.layer].buyables[this.id].cost)},
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
                    if(player.t.points.lt(25))player.t.energy = player.t.energy.sub(cost)	
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                    player.b.dim2 = player.b.dim2.add(1)
                },
                buyMax() {}, // You'll have to handle this yourself if you want
                style: {'height':'222px'},
            },
            21: {
                title: "3rd Booster Dimension", // Optional, displayed at the top in a larger font
                cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                    if(player.h.challenges[12]<2)return Infinity;
					let cost = Decimal.pow(1e50, x.pow(1.35))
                    return cost
                },
                effect() {
					let gain=player.b.dim3;
					gain=gain.mul(Decimal.pow(2,player.b.buyables[21]));
					if(hasUpgrade("sb",12))gain=gain.mul(upgradeEffect("sb",12));
					if(hasUpgrade("t",33))gain=gain.mul(upgradeEffect("t",33));
					return gain;
                },
                display() { // Everything else displayed in the buyable button after the title
                    if(player.h.challenges[12]<2)return "Req: Complete H challenge 2 2 times";
					let data = tmp[this.layer].buyables[this.id]
                    return "You have "+format(player.b.dim3)+" 3rd Booster Dimensions. ("+format(player.b.buyables[21])+" bought)<br>"+
                    "They are producing "+format(data.effect)+" 2nd Booster Dimensions per second.<br>"+
					"Cost for Next 3rd Booster Dimension: "+format(data.cost)+" Time Energy";
                },
                unlocked() { return player.h.unlocked }, 
                canAfford() {
                    return player.t.energy.gte(tmp[this.layer].buyables[this.id].cost)},
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
                    if(player.t.points.lt(25))player.t.energy = player.t.energy.sub(cost)	
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                    player.b.dim3 = player.b.dim3.add(1)
                },
                buyMax() {}, // You'll have to handle this yourself if you want
                style: {'height':'222px'},
            },
            22: {
                title: "4th Booster Dimension", // Optional, displayed at the top in a larger font
                cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                    if(player.h.challenges[12]<3)return Infinity;
					let cost = Decimal.pow(1e250, x.pow(1.35))
                    return cost
                },
                effect() {
					let gain=player.b.dim4;
					gain=gain.mul(Decimal.pow(2,player.b.buyables[22]));
					if(hasUpgrade("sb",12))gain=gain.mul(upgradeEffect("sb",12));
					if(hasUpgrade("t",33))gain=gain.mul(upgradeEffect("t",33));
					return gain;
                },
                display() { // Everything else displayed in the buyable button after the title
                    if(player.h.challenges[12]<3)return "Req: Complete H challenge 2 3 times";
					let data = tmp[this.layer].buyables[this.id]
                    return "You have "+format(player.b.dim4)+" 4th Booster Dimensions. ("+format(player.b.buyables[22])+" bought)<br>"+
                    "They are producing "+format(data.effect)+" 3rd Booster Dimensions per second.<br>"+
					"Cost for Next 4th Booster Dimension: "+format(data.cost)+" Time Energy";
                },
                unlocked() { return player.h.unlocked }, 
                canAfford() {
                    return player.t.energy.gte(tmp[this.layer].buyables[this.id].cost)},
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
                    if(player.t.points.lt(25))player.t.energy = player.t.energy.sub(cost)	
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                    player.b.dim4 = player.b.dim4.add(1)
                },
                buyMax() {}, // You'll have to handle this yourself if you want
                style: {'height':'222px'},
            },
        },
})


addLayer("g", {
    name: "generator",
    symbol: "G",
    position: 1,
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
		power: new Decimal(0),
		extra: new Decimal(0),
		dim1: new Decimal(0),
		dim2: new Decimal(0),
		dim3: new Decimal(0),
		dim4: new Decimal(0),
		dim5: new Decimal(0),
		dim6: new Decimal(0),
		dim7: new Decimal(0),
		dim8: new Decimal(0),
    }},
    color: "#409c6e",
    requires: function(){
		if(!player.g.unlocked && player.b.unlocked)return new Decimal(1e13);
		return new Decimal(1e6);
	},
    resource: "generators",
    baseResource: "points", 
    baseAmount() {return player.points},
    type: "static",
	base: 5,
    exponent: 1.25,
    gainMult() {
        mult = new Decimal(1)
        if(hasUpgrade("g",23)) mult =  mult.div(upgradeEffect("g",23))
        mult=mult.div(tmp.s.buyables[13].effect);
        return mult
    },
    gainExp() {
        return new Decimal(1)
    },
    row: 1,
    hotkeys: [],
    layerShown(){return hasUpgrade("p",11) || player.b.unlocked || player.g.unlocked},
	branches: ["p"],
	effect() {
			if(player.h.activeChallenge==31)return new Decimal(0);
			if(player.h.activeChallenge==41)return new Decimal(0);
			let ret = player.g.points;
			if(hasUpgrade("g",13))ret = ret.mul(upgradeEffect("g",13));
			if(hasUpgrade("g",22))ret = ret.mul(upgradeEffect("g",22));
			if(hasUpgrade("s",11))ret = ret.mul(upgradeEffect("s",11));
			if(hasUpgrade("s",12))ret = ret.mul(upgradeEffect("s",12));
			if(hasUpgrade("s",31))ret = ret.mul(upgradeEffect("s",31));
			if(hasUpgrade("t",31))ret = ret.mul(upgradeEffect("t",31));
			ret = ret.mul(Decimal.pow(tmp.b.effect,tmp.h.challenges[31].rewardEffect));
			ret = ret.mul(tmp.q.quirkEff)
			return ret;
		},
	effectDescription() { // Optional text to describe the effects
           eff = this.effect();
           return "which are generating "+format(eff)+" Generator Power/sec"
       },
	   	extraeffect() {
			if(player.h.activeChallenge==31)return new Decimal(0);
			if(player.h.activeChallenge==41)return new Decimal(0);
			let ret = player.g.extra;
			if(hasUpgrade("g",13))ret = ret.mul(upgradeEffect("g",13));
			if(hasUpgrade("g",22))ret = ret.mul(upgradeEffect("g",22));
			if(hasUpgrade("s",11))ret = ret.mul(upgradeEffect("s",11));
			if(hasUpgrade("s",12))ret = ret.mul(upgradeEffect("s",12));
			if(hasUpgrade("s",31))ret = ret.mul(upgradeEffect("s",31));
			if(hasUpgrade("t",31))ret = ret.mul(upgradeEffect("t",31));
			ret = ret.mul(Decimal.pow(tmp.b.effect,tmp.h.challenges[31].rewardEffect));
			ret = ret.mul(tmp.q.quirkEff)
			return ret;
		},
	 update(diff){
		 player.g.power = player.g.power.add(tmp.g.effect.add(tmp.g.extraeffect).times(diff)).max(0)
		 if(player.s.unlocked)player.g.extra = player.g.extra.add(tmp.g.buyables[11].effect.times(diff)).max(0)
			 if(player.h.challenges[21]>=1)player.g.dim1 = player.g.dim1.add(tmp.g.buyables[12].effect.times(diff)).max(0)
			 if(player.h.challenges[21]>=2)player.g.dim2 = player.g.dim2.add(tmp.g.buyables[21].effect.times(diff)).max(0)
			 if(player.h.challenges[21]>=3)player.g.dim3 = player.g.dim3.add(tmp.g.buyables[22].effect.times(diff)).max(0)
			 if(player.s.best.gte(10)){
				var target=player.g.power.add(1).log(100).pow(1/1.35).add(1).floor();
				if(target.gt(player.g.buyables[11])){
					player.g.dim1=player.g.dim1.add(target.sub(player.g.buyables[11]));
					player.g.buyables[11]=target;
				}
				if(player.h.challenges[21]>=1){
					target=player.g.power.add(1).log(1e10).pow(1/1.35).add(1).floor();
					if(target.gt(player.g.buyables[12])){
						player.g.dim2=player.g.dim2.add(target.sub(player.g.buyables[12]));
						player.g.buyables[12]=target;
					}
				}
				if(player.h.challenges[21]>=2){
					target=player.g.power.add(1).log(1e50).pow(1/1.35).add(1).floor();
					if(target.gt(player.g.buyables[21])){
						player.g.dim3=player.g.dim3.add(target.sub(player.g.buyables[21]));
						player.g.buyables[21]=target;
					}
				}
				if(player.h.challenges[21]>=3){
					target=player.g.power.add(1).log(1e250).pow(1/1.35).add(1).floor();
					if(target.gt(player.g.buyables[22])){
						player.g.dim4=player.g.dim4.add(target.sub(player.g.buyables[22]));
						player.g.buyables[22]=target;
					}
				}
			}
	 },
	getGenPowerEffExp() {
		let exp = new Decimal(1/2)
		if(hasUpgrade("b",21))exp = exp.mul(2);
		if(hasUpgrade("b",22))exp = exp.mul(1.2);
		if(hasUpgrade("e",13))exp = exp.mul(1.15);
		return exp;
	},
	getGenPowerEff() {
		let eff = player.g.power.add(1).pow(tmp.g.getGenPowerEffExp);
		return eff
	},
	 tabFormat: ["main-display",
                    "prestige-button", "resource-display",
                    ["blank", "5px"],
                    ["display-text",
                        function() {return 'You have ' + format(player.g.power) + ' Generator Power, which multiplies Point gain by ' + format(tmp.g.getGenPowerEff)},
                        {}],["display-text",
                        function() {return 'You have ' + format(player.g.extra) + ' Extra Generators, which are generating '+format(tmp.g.extraeffect)+' Generator Power/sec'},
                        {}],
						"buyables",
						"milestones",
                   "upgrades"],
	   upgrades: {
            rows: 4,
            cols: 3,
			11: {
				title: "Generator Upgrade 11",
                description: "Unlock the 2nd Prestige Dimension.",
                cost: new Decimal(4),
                unlocked() { return player.g.unlocked }, // The upgrade is only visible when this is true
            },
			12: {
				title: "Generator Upgrade 12",
                description: "Non-extra Generators boost Prestige Point gain.",
                cost: new Decimal(12),
                unlocked() { return player.b.unlocked && player.g.unlocked }, // The upgrade is only visible when this is true
				effect() { // Calculate bonuses from the upgrade. Can return a single value or an object with multiple values
                    let ret = player.g.points.add(2).pow(hasUpgrade("g",32)?3:1);
					if(hasUpgrade("g",41))ret=ret.mul(Decimal.pow(1.1,player.g.points.mul(hasUpgrade("g",32)?3:1)));
                    return ret;
                },
                effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
            },
			13: {
				title: "Generator Upgrade 13",
                description: "Non-extra Generators boost Generator Power and 1st Prestige Dimension gain.",
                cost: new Decimal(17),
                unlocked() { return player.b.unlocked && player.g.unlocked}, // The upgrade is only visible when this is true
				effect() { // Calculate bonuses from the upgrade. Can return a single value or an object with multiple values
					let base=new Decimal(1.15);
					if(hasUpgrade("g",33))base=base.add(0.1);
					if(player.e.best.gte(1e100))base=base.add(tmp.e.buyables[11].effect[3]);
					if(hasUpgrade("g",43))base=base.add(0.1);
					if(hasUpgrade("sg",23))base=base.add(upgradeEffect("sg",23));
                    let ret = Decimal.pow(base,player.g.points);
                    return ret;
                },
                effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
            },
			21: {
				title: "Generator Upgrade 21",
                description: "Prestige Upgrade 11 is boosted.",
                cost: new Decimal(28),
                unlocked() { return player.g.best.gte(20)}, // The upgrade is only visible when this is true
            },
			22: {
				title: "Generator Upgrade 22",
                description: "Generator Power and 1st Prestige Dimension generates faster based on Generator Power amount.",
                cost: new Decimal(32),
                unlocked() { return player.g.upgrades.includes(21)},
				effect() { return Decimal.pow(1.4,Decimal.log10(player.g.power.add(1)).pow(0.9)) },
				effectDisplay() { return format(this.effect())+"x" },
            },
			23: {
				title: "Generator Upgrade 23",
				description: "Generators are cheaper based on your Prestige Points.",
				cost: new Decimal(36),
				unlocked() { return player.g.upgrades.includes(22) },
				effect() { return player.p.points.add(1).pow(0.25)},
				effectDisplay() { return "/"+format(this.effect()) },
			},
			31: {
				title: "Generator Upgrade 31",
				description: "Prestige Upgrade 22 uses a better formula.",
				cost: new Decimal(50),
				unlocked() { return player.s.unlocked },
			},
			32: {
				title: "Generator Upgrade 32",
				description: "Generator Upgrade 12's effect is cubed.",
				cost: new Decimal(58),
				unlocked() { return player.s.unlocked },
			},
			33: {
				title: "Generator Upgrade 33",
				description: "Add 0.1 to Generator Upgrade 13's base.",
				cost: new Decimal(99),
				unlocked() { return player.s.unlocked },
			},
			41: {
				title: "Generator Upgrade 41",
				description: "Generator Upgrade 12 uses a better formula.",
				cost: new Decimal(6950),
				unlocked() { return player.h.challenges[21]>=1 },
			},
			42: {
				title: "Generator Upgrade 42",
				description: "All Generator Dimensions is boosted by Generator Power.",
				cost: new Decimal(27500),
				unlocked() { return player.h.challenges[21]>=2 },
				effect() { return Decimal.pow(1.2,Decimal.log10(player.g.power.add(1)).pow(0.9)) },
				effectDisplay() { return format(this.effect())+"x" },
			},
			43: {
				title: "Generator Upgrade 43",
				description: "Add 0.1 to Generator Upgrade 13's base.",
				cost: new Decimal(133000),
				unlocked() { return player.h.challenges[21]>=3 },
			},
		},
		milestones: {
            0: {requirementDescription: "10 Generators",
                done() {return player[this.layer].best.gte(10)}, // Used to determine when to give the milestone
                effectDescription: "Keep Prestige Upgrades on reset",
            },
			1: {requirementDescription: "12 Generators",
                done() {return player[this.layer].best.gte(12)},
                effectDescription: "Buying Prestige Dimensions doesn't cost any prestige points",
            },
			2: {requirementDescription: "14 Generators",
                done() {return player[this.layer].best.gte(14)},
                effectDescription: "Gain 100% of Prestige Point gain every second",
            },
			3: {requirementDescription: "16 Generators",
                done() {return player[this.layer].best.gte(16)},
                effectDescription: "Automatically buying Prestige Dimensions",
            },
			4: {requirementDescription: "20 Generators",
                done() {return player[this.layer].best.gte(20)},
                effectDescription: "You can buy max Generators",
            },
		},
		canBuyMax() {return player[this.layer].best.gte(20)},
	doReset(l){
			if(l=="b" || l=="g"){return;}
			if(l=="t" || l=="s" || l=="e" || l=="sb" || l=="h" || l=="q" || l=="sg" || l=="ss"){
				if(player[l].best.gte(2) || l=="e" || l=="sb" || l=="h" || l=="q" || l=="sg" || l=="ss"){
					var b=new Decimal(player.g.best);
					if(player.s.best.gte(3))layerDataReset("g",["upgrades"]);
					else layerDataReset("g",[]);
					player.g.best=b;
				}
				else if(player.s.best.gte(3))layerDataReset("g",["upgrades"]);
				else layerDataReset("g",[]);
				return;
			}
			layerDataReset("g",[]);
		},
		milestonePopups(){
			if(player.h.best.gte(1))return false;
		 if(player.t.best.gte(2) || player.s.best.gte(2))return false;
		 return true;
	 },
	 autoPrestige(){
		 return player.s.best.gte(9);
	 },resetsNothing(){
		 return player.s.best.gte(9);
	 },
	 hotkeys: [
           {key: "g", description: "G: Generator reset", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
     ],
	buyables: {
            rows: 2,
            cols: 2,
            11: {
                title: "1st Generator Dimension", // Optional, displayed at the top in a larger font
                cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                    if(!player.s.unlocked)return Infinity;
                    let cost = Decimal.pow(100, x.pow(1.35));
					if(x==0)return new Decimal(0);
                    return cost
                },
                effect() {
					if(player.h.activeChallenge==21)return new Decimal(0);
                    let gain=player.g.dim1;
					gain=gain.mul(Decimal.pow(2,player.g.buyables[11]));
					gain=gain.mul(tmp.s.buyables[11].effect);
					gain=gain.mul(tmp.e.buyables[11].effect[0]);
					if(hasUpgrade("s",31))gain = gain.mul(upgradeEffect("s",31));
					if(hasUpgrade("g",42))gain = gain.mul(upgradeEffect("g",42));
					gain=gain.mul(tmp.sg.getSuperGenPowerEff);
					return gain;
                },
                display() { // Everything else displayed in the buyable button after the title
                    let data = tmp[this.layer].buyables[this.id]
                    return "You have "+format(player.g.dim1)+" 1st Generator Dimensions. ("+format(player.g.buyables[11])+" bought)<br>"+
                    "They are producing "+format(data.effect)+" Extra Generators per second.<br>"+
					"Cost for Next 1st Generator Dimension: "+format(data.cost)+" Generator Power";
                },
                unlocked() { return player.s.unlocked }, 
                canAfford() {
                    return player[this.layer].power.gte(tmp[this.layer].buyables[this.id].cost)},
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
                    if(player.s.best.lt(10))player[this.layer].power = player[this.layer].power.sub(cost)	
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                    player[this.layer].spentOnBuyables = player[this.layer].spentOnBuyables.add(cost) // This is a built-in system that you can use for respeccing but it only works with a single Decimal value
					player.g.dim1 = player.g.dim1.add(1)
                },
                buyMax() {}, // You'll have to handle this yourself if you want
                style: {'height':'222px'},
            },
            12: {
                title: "2nd Generator Dimension", // Optional, displayed at the top in a larger font
                cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                    if(player.h.challenges[21]<1)return Infinity;
                    let cost = Decimal.pow(1e10, x.pow(1.35));
					if(x==0)return new Decimal(0);
                    return cost
                },
                effect() {
                    let gain=player.g.dim2;
					gain=gain.mul(Decimal.pow(2,player.g.buyables[12]));
					if(hasUpgrade("s",31))gain = gain.mul(upgradeEffect("s",31));
					if(hasUpgrade("g",42))gain = gain.mul(upgradeEffect("g",42));
					gain=gain.mul(tmp.sg.getSuperGenPowerEff);
					return gain;
                },
                display() { // Everything else displayed in the buyable button after the title
                    if(player.h.challenges[21]<1)return "Req: Complete H challenge 3";
					let data = tmp[this.layer].buyables[this.id]
                    return "You have "+format(player.g.dim2)+" 2nd Generator Dimensions. ("+format(player.g.buyables[12])+" bought)<br>"+
                    "They are producing "+format(data.effect)+" 1st Generator Dimensions per second.<br>"+
					"Cost for Next 2nd Generator Dimension: "+format(data.cost)+" Generator Power";
                },
                unlocked() { return player.h.unlocked }, 
                canAfford() {
                    return player[this.layer].power.gte(tmp[this.layer].buyables[this.id].cost)},
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
                    if(player.s.best.lt(10))player[this.layer].power = player[this.layer].power.sub(cost)	
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                    player[this.layer].spentOnBuyables = player[this.layer].spentOnBuyables.add(cost) // This is a built-in system that you can use for respeccing but it only works with a single Decimal value
					player.g.dim2 = player.g.dim2.add(1)
                },
                buyMax() {}, // You'll have to handle this yourself if you want
                style: {'height':'222px'},
            },
            21: {
                title: "3rd Generator Dimension", // Optional, displayed at the top in a larger font
                cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                    if(player.h.challenges[21]<2)return Infinity;
                    let cost = Decimal.pow(1e50, x.pow(1.35));
					if(x==0)return new Decimal(0);
                    return cost
                },
                effect() {
                    let gain=player.g.dim3;
					gain=gain.mul(Decimal.pow(2,player.g.buyables[21]));
					if(hasUpgrade("s",31))gain = gain.mul(upgradeEffect("s",31));
					if(hasUpgrade("g",42))gain = gain.mul(upgradeEffect("g",42));
					gain=gain.mul(tmp.sg.getSuperGenPowerEff);
					return gain;
                },
                display() { // Everything else displayed in the buyable button after the title
                    if(player.h.challenges[21]<2)return "Req: Complete H challenge 3 2 times";
					let data = tmp[this.layer].buyables[this.id]
                    return "You have "+format(player.g.dim3)+" 3rd Generator Dimensions. ("+format(player.g.buyables[21])+" bought)<br>"+
                    "They are producing "+format(data.effect)+" 2nd Generator Dimensions per second.<br>"+
					"Cost for Next 3rd Generator Dimension: "+format(data.cost)+" Generator Power";
                },
                unlocked() { return player.h.unlocked }, 
                canAfford() {
                    return player[this.layer].power.gte(tmp[this.layer].buyables[this.id].cost)},
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
                    if(player.s.best.lt(10))player[this.layer].power = player[this.layer].power.sub(cost)	
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                    player[this.layer].spentOnBuyables = player[this.layer].spentOnBuyables.add(cost) // This is a built-in system that you can use for respeccing but it only works with a single Decimal value
					player.g.dim3 = player.g.dim3.add(1)
                },
                buyMax() {}, // You'll have to handle this yourself if you want
                style: {'height':'222px'},
            },
            22: {
                title: "4th Generator Dimension", // Optional, displayed at the top in a larger font
                cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                    if(player.h.challenges[21]<3)return Infinity;
                    let cost = Decimal.pow(1e250, x.pow(1.35));
					if(x==0)return new Decimal(0);
                    return cost
                },
                effect() {
                    let gain=player.g.dim4;
					gain=gain.mul(Decimal.pow(2,player.g.buyables[22]));
					if(hasUpgrade("s",31))gain = gain.mul(upgradeEffect("s",31));
					if(hasUpgrade("g",42))gain = gain.mul(upgradeEffect("g",42));
					gain=gain.mul(tmp.sg.getSuperGenPowerEff);
					return gain;
                },
                display() { // Everything else displayed in the buyable button after the title
                    if(player.h.challenges[21]<3)return "Req: Complete H challenge 3 3 times";
					let data = tmp[this.layer].buyables[this.id]
                    return "You have "+format(player.g.dim4)+" 4th Generator Dimensions. ("+format(player.g.buyables[22])+" bought)<br>"+
                    "They are producing "+format(data.effect)+" 3rd Generator Dimensions per second.<br>"+
					"Cost for Next 4th Generator Dimension: "+format(data.cost)+" Generator Power";
                },
                unlocked() { return player.h.unlocked }, 
                canAfford() {
                    return player[this.layer].power.gte(tmp[this.layer].buyables[this.id].cost)},
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
                    if(player.s.best.lt(10))player[this.layer].power = player[this.layer].power.sub(cost)	
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                    player[this.layer].spentOnBuyables = player[this.layer].spentOnBuyables.add(cost) // This is a built-in system that you can use for respeccing but it only works with a single Decimal value
					player.g.dim4 = player.g.dim4.add(1)
                },
                buyMax() {}, // You'll have to handle this yourself if you want
                style: {'height':'222px'},
            },
        },
})

addLayer("t", {
    name: "time capsule",
    symbol: "T",
    position: 1,
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
		energy: new Decimal(0),
		dim1: new Decimal(0),
		dim2: new Decimal(0),
		dim3: new Decimal(0),
		dim4: new Decimal(0),
		dim5: new Decimal(0),
		dim6: new Decimal(0),
		dim7: new Decimal(0),
		dim8: new Decimal(0)
    }},
    color: "#3f993d",
    requires: function(){
		if(!player.t.unlocked && player.s.unlocked)return new Decimal(1e240);
		return new Decimal(1e70);
	},
    resource: "time capsules",
    baseResource: "points", 
    baseAmount() {return player.points},
    type: "static",
	base: new Decimal(1e15),
    exponent: 1.85,
    gainMult() {
        mult = new Decimal(1)
        return mult
    },
    gainExp() {
        return new Decimal(1)
    },
    row: 2,
    hotkeys: [],
    layerShown(){return hasUpgrade("b",23) || player.t.unlocked},
	branches: ["b"],
	 update(diff){
		 player.t.energy = player.t.energy.add(tmp.t.effect.times(diff));
		 player.t.energy = player.t.energy.add(tmp.t.buyables[11].effect.times(diff));
		 if(player.h.best.gte(1)){
				var target=player.b.points.div(40).sub(1).pow(1/1.2).div(0.065).add(1).floor();
				if(target.gt(player.t.buyables[11])){
					player.t.dim1=player.t.dim1.add(target.sub(player.t.buyables[11]));
					player.t.buyables[11]=target;
				}
				if(player.h.challenges[32]>=1){
					target=player.b.points.div(160).sub(1).pow(1/1.2).div(0.065).add(1).floor();
					if(target.gt(player.t.buyables[12])){
						player.t.dim2=player.t.dim2.add(target.sub(player.t.buyables[12]));
						player.t.buyables[12]=target;
					}
				}
				if(player.h.challenges[32]>=2){
					target=player.b.points.div(640).sub(1).pow(1/1.2).div(0.065).add(1).floor();
					if(target.gt(player.t.buyables[21])){
						player.t.dim3=player.t.dim3.add(target.sub(player.t.buyables[21]));
						player.t.buyables[21]=target;
					}
				}
			}
		if(player.h.challenges[32]>=1){
			player.t.dim1= player.t.dim1.add(tmp.t.buyables[12].effect.times(diff));
		}
		if(player.h.challenges[32]>=2){
			player.t.dim2= player.t.dim2.add(tmp.t.buyables[21].effect.times(diff));
		}
	 },
	effect() {
		let ret = player.t.points;
		if(hasUpgrade("b",33))ret = ret.mul(upgradeEffect("b",33));
		if(hasUpgrade("t",11))ret = ret.mul(upgradeEffect("t",11));
		if(hasUpgrade("t",13))ret = ret.mul(upgradeEffect("t",13));
		if(hasUpgrade("t",21))ret = ret.mul(upgradeEffect("t",21));
		return ret;
	},
	effectDescription() { // Optional text to describe the effects
           eff = this.effect();
           return "which are generating "+format(eff)+" Time Energy/sec"
       },
	   
	getTimeEff() {
		let exp = 1.2;
		if (hasUpgrade("t",13)) exp = 1.75;
		let eff = player.t.energy.add(1).pow(exp);
		return eff;
	},
	tabFormat: ["main-display",
                    "prestige-button", "resource-display",
                    ["blank", "5px"],
					"buyables",
                    ["display-text",
                        function() {return 'You have ' + format(player.t.energy) + ' Time Energy, which multiplies Point gain & Prestige Point gain by ' + format(tmp.t.getTimeEff)},
                        {}],
						"milestones",
                   "upgrades"],
	milestones: {
            0: {requirementDescription: "2 time capsules",
                done() {return player[this.layer].best.gte(2)}, // Used to determine when to give the milestone
                effectDescription: "Keep Booster/Generator milestones on reset, keep Prestige Upgrades on reset and you can buy 1st Time Dimension",
            },
            1: {requirementDescription: "3 time capsules",
                done() {return player[this.layer].best.gte(3)}, // Used to determine when to give the milestone
                effectDescription: "Keep Booster Upgrades on all row 3 resets and unlock Time Upgrades",
            },
			2: {requirementDescription: "9 time capsules",
                done() {return player[this.layer].best.gte(9)}, // Used to determine when to give the milestone
                effectDescription: "Automatically buy Boosters and Booster resets nothing",
            },
			3: {requirementDescription: "25 time capsules",
                done() {return player[this.layer].best.gte(25)}, // Used to determine when to give the milestone
                effectDescription: "You can buy max Time Capsules, Automatically buy Booster Dimensions and Booster Dimensions costs nothing",
            },
	},canBuyMax() {return player[this.layer].best.gte(25)},
	buyables: {
            rows: 2,
            cols: 2,
            11: {
                title: "1st Time Dimension", // Optional, displayed at the top in a larger font
                cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                    let cost = x.mul(0.065).pow(1.2).add(1).mul(40).ceil()
                    return cost
                },
                effect() {
					if(player.h.activeChallenge==32)return new Decimal(0);
					if(player.h.activeChallenge==42)return new Decimal(0);
					let gain=player.t.dim1;
					gain=gain.mul(tmp.t.effect);
					gain=gain.mul(Decimal.pow(2,player.t.buyables[11]));
					gain=gain.mul(tmp.h.effect);
					return gain;
                },
                display() { // Everything else displayed in the buyable button after the title
                    let data = tmp[this.layer].buyables[this.id]
                    return "You have "+format(player.t.dim1)+" 1st Time Dimensions. ("+format(player.t.buyables[11])+" bought)<br>"+
                    "They are producing "+format(data.effect)+" Time Energy per second.<br>"+
					"Cost for Next 1st Time Dimension: "+format(data.cost)+" Boosters";
                },
                unlocked() { return player[this.layer].best.gte(2) }, 
                canAfford() {
                    return player.b.points.gte(tmp[this.layer].buyables[this.id].cost)},
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
					if(player.h.best.lt(1))player.b.points = player.b.points.sub(cost)	
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                    player[this.layer].spentOnBuyables = player[this.layer].spentOnBuyables.add(cost) // This is a built-in system that you can use for respeccing but it only works with a single Decimal value
					player.t.dim1 = player.t.dim1.add(1)
                },
                buyMax() {}, // You'll have to handle this yourself if you want
                style: {'height':'222px'},
            },
            12: {
                title: "2nd Time Dimension", // Optional, displayed at the top in a larger font
                cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                    if(player.h.challenges[32]<1)return Infinity;
                    let cost = x.mul(0.065).pow(1.2).add(1).mul(160).ceil()
                    return cost
                },
                effect() {
					let gain=player.t.dim2;
					gain=gain.mul(Decimal.pow(2,player.t.buyables[12]));
					gain=gain.mul(tmp.h.effect);
					return gain;
                },
                display() { // Everything else displayed in the buyable button after the title
					if(player.h.challenges[32]<1)return "Req: Complete H Challenge 6";
                    let data = tmp[this.layer].buyables[this.id]
                    return "You have "+format(player.t.dim2)+" 2nd Time Dimensions. ("+format(player.t.buyables[12])+" bought)<br>"+
                    "They are producing "+format(data.effect)+" 1st Time Dimensions per second.<br>"+
					"Cost for Next 2nd Time Dimension: "+format(data.cost)+" Boosters";
                },
                unlocked() { return player.q.unlocked }, 
                canAfford() {
                    return player.b.points.gte(tmp[this.layer].buyables[this.id].cost)},
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
					if(player.h.best.lt(1))player.b.points = player.b.points.sub(cost)	
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                    player[this.layer].spentOnBuyables = player[this.layer].spentOnBuyables.add(cost) // This is a built-in system that you can use for respeccing but it only works with a single Decimal value
					player.t.dim1 = player.t.dim1.add(1)
                },
                buyMax() {}, // You'll have to handle this yourself if you want
                style: {'height':'222px'},
            },
            21: {
                title: "3rd Time Dimension", // Optional, displayed at the top in a larger font
                cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                    if(player.h.challenges[32]<2)return Infinity;
                    let cost = x.mul(0.065).pow(1.2).add(1).mul(640).ceil()
                    return cost
                },
                effect() {
					let gain=player.t.dim3;
					gain=gain.mul(Decimal.pow(2,player.t.buyables[21]));
					gain=gain.mul(tmp.h.effect);
					return gain;
                },
                display() { // Everything else displayed in the buyable button after the title
					if(player.h.challenges[32]<2)return "Req: Complete H Challenge 6 2 times";
                    let data = tmp[this.layer].buyables[this.id]
                    return "You have "+format(player.t.dim3)+" 3rd Time Dimensions. ("+format(player.t.buyables[21])+" bought)<br>"+
                    "They are producing "+format(data.effect)+" 2nd Time Dimensions per second.<br>"+
					"Cost for Next 3rd Time Dimension: "+format(data.cost)+" Boosters";
                },
                unlocked() { return player.q.unlocked }, 
                canAfford() {
                    return player.b.points.gte(tmp[this.layer].buyables[this.id].cost)},
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
					if(player.h.best.lt(1))player.b.points = player.b.points.sub(cost)	
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                    player[this.layer].spentOnBuyables = player[this.layer].spentOnBuyables.add(cost) // This is a built-in system that you can use for respeccing but it only works with a single Decimal value
					player.t.dim1 = player.t.dim1.add(1)
                },
                buyMax() {}, // You'll have to handle this yourself if you want
                style: {'height':'222px'},
            },
        },
		
	upgrades:{
		rows: 4,
		cols: 3,
		11: {
			title: "Time Upgrade 11",
            description: "Time Energy gain is boosted by your Time Capsules.",
			cost: new Decimal(11),
			unlocked() { return player.t.best.gte(3) },
			effect() { 
				let ret=player.t.points.pow(3);
				if(hasUpgrade("t",22))ret=ret.mul(Decimal.pow(4,player.t.points));
				ret=ret.mul(tmp.h.effect);
				return ret;
			},
			effectDisplay() { return "x"+format(this.effect()) },
		},
		12: {
			title: "Time Upgrade 12",
            description: "Time Capsules boost the Booster effect.",
			cost: new Decimal(3),
			unlocked() { return player.t.best.gte(3) },
			effect() {
				if(hasUpgrade("t",41))return player.t.points.pow(1.5).add(1);
				return player.t.points.pow(0.9).add(0.5);
			},
			effectDisplay() { return "+"+format(this.effect())+" to base" },
		},
		13: {
			title: "Time Upgrade 13",
            description: "Time Energy boosts its own production, and the Time Energy effect uses a better formula.",
			cost: new Decimal(14),
			unlocked() { return player.t.best.gte(3) },
			effect() { 
					let base=new Decimal(1.15);
					if(hasUpgrade("t",32))base=base.add(0.5);
                    let ret = Decimal.pow(base,Decimal.log10(player.t.energy.add(1)).pow(0.9));
					return ret;
			},
			effectDisplay() { return format(this.effect())+"x" },
		},
		21: {
			title: "Time Upgrade 21",
            description: "Time Energy production is boosted by your Enhance Points.",
			cost: new Decimal(15),
			unlocked() { return player.e.unlocked },
			effect() { 
				let base=20;
                let ret = Decimal.pow(base,Decimal.log10(player.e.points.add(1)).pow(0.9));
			return ret;
			},
			effectDisplay() { return format(this.effect())+"x" },
		},
		22: {
			title: "Time Upgrade 22",
            description: "Time Upgrade 11 is better.",
			cost: new Decimal(18),
			unlocked() { return player.e.unlocked },
		},
		23: {
			title: "Time Upgrade 23",
            description: "Unlock the 1st Booster Dimension.",
			cost: new Decimal(24),
			unlocked() { return player.e.unlocked },
		},
		31: {
			title: "Time Upgrade 31",
            description: "Generators are stronger based on your Time Energy.",
			cost: new Decimal(59),
			unlocked() { return player.h.unlocked },
			effect() { let base=1.65;
                    let ret = Decimal.pow(base,Decimal.log10(player.t.energy.add(1)).pow(0.9));
					return ret;},
			effectDisplay() { return format(this.effect())+"x" },
		},
		32: {
			title: "Time Upgrade 32",
            description: "Time Upgrade 13 is better.",
			cost: new Decimal(62),
			unlocked() { return player.h.unlocked },
		},
		33: {
			title: "Time Upgrade 33",
            description: "All Booster Dimensions are stronger based on your Time Energy.",
			cost: new Decimal(100),
			unlocked() { return hasUpgrade("sb",12); },
			effect() { 
					let base=new Decimal(1.01);
                    let ret = Decimal.pow(base,Decimal.log10(player.t.energy.add(1)).pow(0.9));
					return ret;
			},
			effectDisplay() { return format(this.effect())+"x" },
		},
		41: {
			title: "Time Upgrade 41",
            description: "Time Upgrade 12 is better.",
			cost: new Decimal(140),
			unlocked() { return player.h.challenges[32]>=1 },
		},
		42: {
			title: "Time Upgrade 42",
            description: "Super-Boosters are stronger based on your Time Energy.",
			cost: new Decimal(252),
			unlocked() { return player.h.challenges[32]>=2 },
			effect() { // Calculate bonuses from the upgrade. Can return a single value or an object with multiple values
                let ret = player.t.energy.add(1e10).log10().log10().div(50);
				return ret;
            },
            effectDisplay() { return "+"+format(this.effect())+" to the base" }, // Add formatting to the effect
		},
	},
	doReset(l){
			if(l=="t" || l=="s" || l=="e" || l=="sb" || l=="sg"){return;}
			if(l=="h" || l=="q" || l=="ss"){
					var b=new Decimal(player.t.best);
					if(player[l].best.gte(2) || l=="ss")layerDataReset("t",["upgrades"]);
					else layerDataReset("t",[]);
					player.t.best=b;
					return;
				}
			layerDataReset("t",[]);
		},
		milestonePopups(){
			if(player.h.best.gte(1))return false;
		 return true;
	    },
	 autoPrestige(){
		 return player.h.best.gte(30);
	 },resetsNothing(){
		 return player.h.best.gte(30);
	 },
	 hotkeys: [
           {key: "t", description: "T: Time reset", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
     ],
})

addLayer("s", {
    name: "space energy",
    symbol: "S",
    position: 3,
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
		dim: new Decimal(0),
    }},
    color: "#dfdfdf",
    requires: function(){
		if(!player.s.unlocked && player.t.unlocked)return new Decimal(1e240);
		return new Decimal(1e70);
	},
    resource: "space energy",
    baseResource: "points", 
    baseAmount() {return player.points},
    type: "static",
	base: new Decimal(1e15),
    exponent: 1.85,
    gainMult() {
        mult = new Decimal(1)
        return mult
    },
    gainExp() {
        return new Decimal(1)
    },
    row: 2,
    hotkeys: [],
    layerShown(){return hasUpgrade("g",23) || player.s.unlocked},
	branches: ["g"],
	milestones: {
            0: {requirementDescription: "1 space energy",
                done() {return player[this.layer].best.gte(1)}, // Used to determine when to give the milestone
                effectDescription: "Unlock 1st Generator Dimension.",
            },
			1: {requirementDescription: "2 space energy",
                done() {return player[this.layer].best.gte(2)}, // Used to determine when to give the milestone
                effectDescription: "Keep Booster/Generator milestones on reset, keep Prestige Upgrades on reset and unlock Space Building 2 and 3",
            },
            2: {requirementDescription: "3 space energy",
                done() {return player[this.layer].best.gte(3)}, // Used to determine when to give the milestone
                effectDescription: "Keep Generator Upgrades on all row 3 resets and unlock Space Upgrades",
            },
			3: {requirementDescription: "9 space energy",
                done() {return player[this.layer].best.gte(9)}, // Used to determine when to give the milestone
                effectDescription: "Automatically buy Generators and Generator resets nothing",
            },
			4: {requirementDescription: "10 space energy",
                done() {return player[this.layer].best.gte(10)}, // Used to determine when to give the milestone
                effectDescription: "Automatically buy Generator Dimensions and buying Generator Dimensions costs nothing",
            },
			5: {requirementDescription: "16 space energy",
                done() {return player[this.layer].best.gte(16)}, // Used to determine when to give the milestone
                effectDescription: "Unlock Space Building 4",
            },
			6: {requirementDescription: "25 space energy",
                done() {return player[this.layer].best.gte(25)}, // Used to determine when to give the milestone
                effectDescription: "You can buy max Space Energy and unlock Space Building 5",
            },
	},canBuyMax() {return player[this.layer].best.gte(25)},
	tabFormat: ["main-display",
                    "prestige-button", "resource-display",
                    ["blank", "5px"],
					"buyables",["display-text",
                        function() {return "Space Building Strength: "+format(tmp.s.getStrength)+"<br>"},
                        {}],
                    ["display-text",
                        function() {return 'You have ' + format(tmp.s.getSpace) + ' Space remaining for Space Buildings.'},
                        {}],
                    ["display-text",
                        function() {return 'You have ' + format(player.g.power) + ' Generator Power'},
                        {}],
						"milestones",
                   "upgrades"],
				    
	getBaseSpace(){
		let baseSpace = player.s.best.pow(1.1).times(3);
		if(hasUpgrade("s",31))baseSpace=baseSpace.add(player.s.dim);
		baseSpace=baseSpace.floor();
		return baseSpace;
	},
	getSpace(){
		let baseSpace = tmp.s.getBaseSpace;
		return baseSpace.sub(tmp.s.getSpaceSpent);
	},
	getSpaceSpent(){
		return player[this.layer].buyables[11].add(player[this.layer].buyables[12]).add(player[this.layer].buyables[13]).add(player[this.layer].buyables[14]).add(player[this.layer].buyables[15]);
	},
	
	buyables: {
            rows: 2,
            cols: 5,
            11: {
                cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                    let cost = Decimal.pow(1e4,Decimal.pow(x,1.35))
					if(x.eq(0))return new Decimal(0)
					if(hasUpgrade("s",32))cost=cost.div(upgradeEffect("s",32));
                    return cost
                },
                effect(x=player[this.layer].buyables[this.id]) { // Effects of owning x of the items, x is a decimal
					x = x.add(tmp.s.buyables[15].effect);
					x=x.mul(tmp.s.getStrength);
                    let eff = x.pow(4)
					if(hasUpgrade("s",21))eff = eff.mul(Decimal.pow(1.25,x));
					eff=eff.add(1);
                    return eff;
                },
                display() { // Everything else displayed in the buyable button after the title
                    let data = tmp[this.layer].buyables[this.id]
                    return "Space Building 1\n\
					Cost: " + format(data.cost) + " Generator Power\n\
                    Level: " + player[this.layer].buyables[this.id] + "\n"+
                    "Currently: Multiply Extra Generator Gain by "+format(data.effect)+".";
                },
                unlocked() { return true }, 
                canAfford() {
                    return player.g.power.gte(tmp[this.layer].buyables[this.id].cost) && tmp.s.getSpace.gt(0)
				},
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
                    if(player.h.best.lt(3))player.g.power = player.g.power.sub(cost)	
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                },
                buyMax() {}, // You'll have to handle this yourself if you want
                style: {'height':'120px','width':'120px'},
                
            },
			12: {
                cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                    let cost = Decimal.pow(1e6,Decimal.pow(x,1.35))
					if(x.eq(0))return new Decimal(0)
					if(hasUpgrade("s",32))cost=cost.div(upgradeEffect("s",32));
					return cost
                },
                effect(x=player[this.layer].buyables[this.id]) { // Effects of owning x of the items, x is a decimal
					x = x.add(tmp.s.buyables[15].effect);
					x=x.mul(tmp.s.getStrength);
                    let ret = Decimal.pow(Decimal.add(1, x.pow(2)), player.s.points).times(1).max(1)
					return ret
				},
                display() { // Everything else displayed in the buyable button after the title
                    let data = tmp[this.layer].buyables[this.id]
                    return "Space Building 2\n\
					Cost: " + format(data.cost) + " Generator Power\n\
                    Level: " + player[this.layer].buyables[this.id] + "\n\
                    Currently: Space Energy boosts Point gain & Prestige Point gain ("+format(data.effect)+"x)";
                },
                unlocked() { return player[this.layer].best.gte(2) }, 
                canAfford() {
                    return player.g.power.gte(tmp[this.layer].buyables[this.id].cost) && tmp.s.getSpace.gt(0)
				},
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
                    if(player.h.best.lt(3))player.g.power = player.g.power.sub(cost)	
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                },
                buyMax() {}, // You'll have to handle this yourself if you want
                style: {'height':'120px','width':'120px'},
                
            },
			13: {
                cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                    let cost = Decimal.pow(1e12,Decimal.pow(x.add(1),1.35))
					
					if(hasUpgrade("s",32))cost=cost.div(upgradeEffect("s",32));
					return cost
                },
                effect(x=player[this.layer].buyables[this.id]) { // Effects of owning x of the items, x is a decimal
					if(x.eq(0))return new Decimal(1);
					x = x.add(tmp.s.buyables[15].effect);
					x=x.mul(tmp.s.getStrength);
					x = Decimal.pow(1e10, x.pow(0.9)).mul(1e20);
					if(hasUpgrade("s",22))x = x.pow(2);
					return x
                },
                display() { // Everything else displayed in the buyable button after the title
                    let data = tmp[this.layer].buyables[this.id]
                    return "Space Building 3\n\
					Cost: " + format(data.cost) + " Generator Power\n\
                    Level: " + player[this.layer].buyables[this.id] + "\n\
                    Currently: Makes Boosters/Generators cheaper by "+format(data.effect)+"x";
                },
                unlocked() { return player[this.layer].best.gte(2) }, 
                canAfford() {
                    return player.g.power.gte(tmp[this.layer].buyables[this.id].cost) && tmp.s.getSpace.gt(0)
				},
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
                    if(player.h.best.lt(3))player.g.power = player.g.power.sub(cost)	
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                },
                buyMax() {}, // You'll have to handle this yourself if you want
                style: {'height':'120px','width':'120px'},
                
            },
			14: {
                cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                    let cost = Decimal.pow(1e24,Decimal.pow(x.add(2),1.35))
					
					if(hasUpgrade("s",32))cost=cost.div(upgradeEffect("s",32));
					return cost
                },
                effect(x=player[this.layer].buyables[this.id]) { // Effects of owning x of the items, x is a decimal
					if(x.eq(0))return new Decimal(1);
					x = x.add(tmp.s.buyables[15].effect);
					x=x.mul(tmp.s.getStrength);
					if(hasUpgrade("s",23))x = x.mul(2);
					//if (x.gte("e3e9")) x = Decimal.pow(10, x.log10().times(9e18).cbrt())
					return x
                },
                display() { // Everything else displayed in the buyable button after the title
                    let data = tmp[this.layer].buyables[this.id]
                    return "Space Building 4\n\
					Cost: " + format(data.cost) + " Generator Power\n\
                    Level: " + player[this.layer].buyables[this.id] + "\n\
                    Currently: Booster Upgrade 23's effect is raised to the power of "+format(data.effect);
                },
                unlocked() { return player[this.layer].best.gte(16) }, 
                canAfford() {
                    return player.g.power.gte(tmp[this.layer].buyables[this.id].cost) && tmp.s.getSpace.gt(0)
				},
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
                    if(player.h.best.lt(3))player.g.power = player.g.power.sub(cost)	
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                },
                buyMax() {}, // You'll have to handle this yourself if you want
                style: {'height':'120px','width':'120px'},
                
            },
			15: {
                cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                    let cost = Decimal.pow(1e50,Decimal.pow(x.add(3),1.35))
					if(hasUpgrade("s",32))cost=cost.div(upgradeEffect("s",32));
					return cost
                },
                effect(x=player[this.layer].buyables[this.id]) { // Effects of owning x of the items, x is a decimal
					x = x.add(tmp.ss.getFreeLevel);
					x=x.mul(tmp.s.getStrength);
					//if (x.gte("e3e9")) x = Decimal.pow(10, x.log10().times(9e18).cbrt())
					return x.sqrt()
                },
                display() { // Everything else displayed in the buyable button after the title
                    let data = tmp[this.layer].buyables[this.id]
                    return "Space Building 5\n\
					Cost: " + format(data.cost) + " Generator Power\n\
                    Level: " + player[this.layer].buyables[this.id] + "\n\
                    Currently: Add "+format(data.effect)+" free levels to all previous Space Buildings";
                },
                unlocked() { return player[this.layer].best.gte(25) }, 
                canAfford() {
                    return player.g.power.gte(tmp[this.layer].buyables[this.id].cost) && tmp.s.getSpace.gt(0)
				},
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
                    if(player.h.best.lt(3))player.g.power = player.g.power.sub(cost)	
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                },
                buyMax() {}, // You'll have to handle this yourself if you want
                style: {'height':'120px','width':'120px'},
                
            },
			21: {
                cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                    let cost = Decimal.pow(1e100,Decimal.pow(x.add(3),1.35))
					if(x.eq(0))return new Decimal(0)
					if(hasUpgrade("s",32))cost=cost.div(upgradeEffect("s",32));
					return cost
                },
                effect(x=player[this.layer].buyables[this.id]) { // Effects of owning x of the items, x is a decimal
					x = x.add(tmp.ss.getFreeLevel);
					x=x.mul(tmp.s.getStrength);
					//if (x.gte("e3e9")) x = Decimal.pow(10, x.log10().times(9e18).cbrt())
					x=Decimal.pow(3,x);
					x=x.mul(tmp.q.quirkEff);
					return x;
                },
                display() { // Everything else displayed in the buyable button after the title
                    let data = tmp[this.layer].buyables[this.id]
                    return "Space Building 6\n\
					Cost: " + format(data.cost) + " Generator Power\n\
                    Level: " + player[this.layer].buyables[this.id] + "\n\
                    Currently: Gain "+format(data.effect)+" Space per second.";
                },
                unlocked() { return hasUpgrade("s",31) }, 
                canAfford() {
                    return player.g.power.gte(tmp[this.layer].buyables[this.id].cost)// && tmp.s.getSpace.gt(0)
				},
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
                    if(player.h.best.lt(3))player.g.power = player.g.power.sub(cost)	
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                },
                buyMax() {}, // You'll have to handle this yourself if you want
                style: {'height':'120px','width':'120px'},
                
            },
        },
		
	update(diff){
		 if(hasUpgrade("s",31))player.s.dim = player.s.dim.add(tmp.s.buyables[21].effect.times(diff)).max(0);
		 if(player.h.best.gte(3)){
			var pow=player.g.power;
			if(hasUpgrade("s",32))pow=pow.mul(upgradeEffect("s",32));
			var target=pow.add(1).log(1e100).pow(1/1.35).sub(2).floor().max(1);
			//if(target.gte(tmp.s.getSpace.add(player.s.buyables[21])))target=tmp.s.getSpace.add(player.s.buyables[21]);
			if(target.gt(player.s.buyables[21])&&hasUpgrade("s",31)){
				player.s.buyables[21]=target;
			}
			target=pow.add(1).log(1e50).pow(1/1.35).sub(2).floor();
			if(target.gte(tmp.s.getSpace.add(player.s.buyables[15])))target=tmp.s.getSpace.add(player.s.buyables[15]);
			if(target.gt(player.s.buyables[15])&&player.s.best.gte(25)){
				player.s.buyables[15]=target;
			}
			target=pow.add(1).log(1e24).pow(1/1.35).sub(1).floor();
			if(target.gte(tmp.s.getSpace.add(player.s.buyables[14])))target=tmp.s.getSpace.add(player.s.buyables[14]);
			if(target.gt(player.s.buyables[14])&&player.s.best.gte(16)){
				player.s.buyables[14]=target;
			}
			target=pow.add(1).log(1e12).pow(1/1.35).floor();
			if(target.gte(tmp.s.getSpace.add(player.s.buyables[13])))target=tmp.s.getSpace.add(player.s.buyables[13]);
			if(target.gt(player.s.buyables[13])&&player.s.best.gte(2)){
				player.s.buyables[13]=target;
			}
			target=pow.add(1).log(1e6).pow(1/1.35).add(1).floor();
			if(target.gte(tmp.s.getSpace.add(player.s.buyables[12])))target=tmp.s.getSpace.add(player.s.buyables[12]);
			if(target.gt(player.s.buyables[12])&&player.s.best.gte(2)){
				player.s.buyables[12]=target;
			}
			target=pow.add(1).log(1e4).pow(1/1.35).add(1).floor();
			if(target.gte(tmp.s.getSpace.add(player.s.buyables[11])))target=tmp.s.getSpace.add(player.s.buyables[11]);
			if(target.gt(player.s.buyables[11])){
				player.s.buyables[11]=target;
			}
		 }
	 },
	 upgrades:{
		rows: 4,
		cols: 3,
		11: {
			title: "Space Upgrade 11",
            description: "Generator Power boosts Generator Power and 1st Prestige Dimension gain.",
			cost: new Decimal(3),
			unlocked() { return player.s.best.gte(3) },
			effect() { let ret = Decimal.pow(1.5,Decimal.log10(player.g.power.add(1)).pow(0.9));return ret; },
			effectDisplay() { return format(this.effect())+"x" },
		},
		12: {
			title: "Space Upgrade 12",
            description: "Space Building Levels boost Generator Power and 1st Prestige Dimension gain.",
			cost: new Decimal(3),
			unlocked() { return player.s.best.gte(3) },
			effect() { return Decimal.pow(2, tmp.s !== undefined ? tmp.s.getSpaceSpent : 0) },
			effectDisplay() { return format(this.effect())+"x" },
		},
		13: {
			title: "Space Upgrade 13",
            description: "All Space Buildings are stronger based on your Generators.",
			cost: new Decimal(4),
			unlocked() { return player.s.best.gte(3) },
			effect() { return player.g.points.add(1).log10().div(1.5).add(1) },
			effectDisplay() { return format(this.effect())+"x stronger" },
		},
		21: {
			title: "Space Upgrade 21",
            description: "Space Building 1 uses a better formula.",
			cost: new Decimal(16),
			unlocked() { return player.e.unlocked },
		},
		22: {
			title: "Space Upgrade 22",
            description: "Space Building 3's effect is squared.",
			cost: new Decimal(19),
			unlocked() { return player.e.unlocked },
		},
		23: {
			title: "Space Upgrade 23",
            description: "Space Building 4's effect is doubled.",
			cost: new Decimal(30),
			unlocked() { return player.e.unlocked },
		},
		31: {
			title: "Space Upgrade 31",
            description: "Unlock Space Building 6, it will generate Space. Generators and all Generator Dimensions are stronger based on your Total Space.",
			cost: new Decimal(51),
			unlocked() { return player.h.unlocked },
			effect() { return tmp.s.getBaseSpace.plus(10); },
			effectDisplay() { return format(this.effect())+"x" },
		},
		32: {
			title: "Space Upgrade 32",
            description: "Total Space cheapens Space Buildings.",
			cost: new Decimal(79),
			unlocked() { return player.h.unlocked },
			effect() { return tmp.s.getBaseSpace.plus(10).pow(10); },
			effectDisplay() { return "/"+format(this.effect()) },
		},
		33: {
			title: "Space Upgrade 33",
            description: "Space Buildings are stronger based on total space.",
			cost: new Decimal(121),
			unlocked() { return player.q.unlocked },
			effect() { return Decimal.log10(Decimal.log10(Decimal.log10(tmp.s.getBaseSpace.plus(10)).plus(10)).plus(10)).pow(1.5); },
			effectDisplay() { return format(this.effect())+"x" },
		},
	},
		doReset(l){
			if(l=="t" || l=="s" || l=="e" || l=="sb" || l=="sg"){return;}
			if(l=="h" || l=="q" || l=="ss"){
					var b=new Decimal(player.s.best);
					if(player[l].best.gte(2) || l=="ss")layerDataReset("s",["upgrades"]);
					else layerDataReset("s",[]);
					player.s.best=b;
					return;
				}
			layerDataReset("s",[]);
		},
		milestonePopups(){
			if(player.h.best.gte(1))return false;
		 return true;
	    },
	 autoPrestige(){
		 return player.h.best.gte(100);
	 },resetsNothing(){
		 return player.h.best.gte(100);
	 },
	 hotkeys: [
           {key: "s", description: "S: Space reset", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
     ],
	getStrength(){
		if(player.h.activeChallenge==42)return new Decimal(0);
		let x=new Decimal(1);
		if(hasUpgrade("s",13))x = x.mul(upgradeEffect("s",13));
		if(hasUpgrade("s",33))x = x.mul(upgradeEffect("s",33));
		x=x.mul(tmp.ss.getAddStrength);
		return x;
	},
})

addLayer("e", {
    name: "enhance",
    symbol: "E",
    position: 2,
    startData() { return {
        unlocked: false,
		points: new Decimal(0)
    }},
    color: "#9643a3",
    requires: function(){
		return new Decimal("1e1600");
	},
    resource: "enhance points",
    baseResource: "points", 
    baseAmount() {return player.points},
    type: "normal",
    exponent: 0.02,
    gainMult() {
        mult = new Decimal(1)
		if(hasUpgrade("e",21))mult=mult.mul(upgradeEffect("e",21));
		if(player.h.best.gte(1))mult=mult.mul(1e4);
		if(player.h.best.gte(2))mult=mult.mul(1e4);
		if(player.h.best.gte(3))mult=mult.mul(1e4);
		if(player.h.best.gte(10))mult=mult.mul(1e4);
		if(player.h.best.gte(30))mult=mult.mul(1e4);
		if(player.h.best.gte(50))mult=mult.mul(1e4);
		if(player.h.best.gte(100))mult=mult.mul(1e4);
		if(hasUpgrade("q",11)) mult =  mult.mul(upgradeEffect("q",11))
        return mult
    },
    gainExp() {
        return new Decimal(1)
    },
    row: 2,
	softcap: new Decimal(Infinity),
	softcapPower: new Decimal(1),
    hotkeys: [],
    layerShown(){return hasUpgrade("p",33) || player.e.unlocked},
	branches: ["b","g"],
	milestones: {
            0: {requirementDescription: "1 enhance points",
                done() {return player[this.layer].best.gte(1)}, // Used to determine when to give the milestone
                effectDescription: "Keep Booster/Generator milestones on reset, keep Prestige upgrades on reset",
            },
			1: {requirementDescription: "100 enhance points",
                done() {return player[this.layer].best.gte(100)}, // Used to determine when to give the milestone
                effectDescription: "Unlock Enhancer Effect 2.",
            },
			2: {requirementDescription: "5000 enhance points",
                done() {return player[this.layer].best.gte(5000)}, // Used to determine when to give the milestone
                effectDescription: "Unlock Enhancer Effect 3.",
            },
			3: {requirementDescription: "1e100 enhance points",
                done() {return player[this.layer].best.gte(1e100)}, // Used to determine when to give the milestone
                effectDescription: "Unlock Enhancer Effect 4.",
            },
			4: {requirementDescription: "1e1000 enhance points",
                done() {return player[this.layer].best.gte("1e1000")}, // Used to determine when to give the milestone
                effectDescription: "Unlock Enhancer Effect 5.",
            },
	},
	getStrength(){
		if(player.h.activeChallenge==42)return new Decimal(0);
		let x=new Decimal(1);
		if(hasUpgrade("e",22))x=x.mul(upgradeEffect("e",22));
		if(hasUpgrade("e",32))x=x.mul(upgradeEffect("e",32));
		if(hasUpgrade("e",33))x=x.mul(upgradeEffect("e",33));
		return x;
	},
	buyables: {
            rows: 1,
            cols: 1,
            11: {
                title: "Enhancer", // Optional, displayed at the top in a larger font
                cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                    let cost = Decimal.pow(2, x.pow(1.5))
                    return cost
                },
                effect(x=player[this.layer].buyables[this.id]) { // Effects of owning x of the items, x is a decimal
					x=x.mul(tmp.e.getStrength);
					let eff = [];
					eff[0]=Decimal.pow(x, 4).mul(Decimal.pow(2, x)).mul(1e3);
					eff[1]=Decimal.pow(100,x.pow(1.1));
					eff[2]=x.sqrt().mul(0.3);
					eff[3]=x.sqrt().mul(0.004);
					eff[4]=x.sqrt().mul(0.3).add(2).pow(0.1);
					eff[5]=Decimal.pow(1.001,x.pow(0.9));
					eff[6]=Decimal.pow(1.001,x.pow(0.9));
                    if(hasUpgrade("e",12))eff[0]=eff[0].mul(upgradeEffect("e",12));
					return eff;
                },
                display() { // Everything else displayed in the buyable button after the title
                    let data = tmp[this.layer].buyables[this.id]
                    return "You have "+format(player[this.layer].buyables[this.id])+" Enhancers.\n\
					Cost for Next Enhancer: " + format(data.cost) + " Enhance Points";
                },
                unlocked() { return true }, 
                canAfford() {
                    return player[this.layer].points.gte(tmp[this.layer].buyables[this.id].cost)},
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
                    if(player.h.best.lt(2))player[this.layer].points = player[this.layer].points.sub(cost)	
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                    player[this.layer].spentOnBuyables = player[this.layer].spentOnBuyables.add(cost) // This is a built-in system that you can use for respeccing but it only works with a single Decimal value
                },
                buyMax() {}, // You'll have to handle this yourself if you want
                style: {'height':'222px'},
                
            },
        },
	update(diff){
		 if(player.h.best.gte(2)){
				var target=player.e.points.add(1).log(2).pow(1/1.5).add(1).floor();
				if(target.gt(player.e.buyables[11])){
					player.e.buyables[11]=target;
				}
			}
	 },
	tabFormat: ["main-display",
                    "prestige-button", "resource-display",
                    ["blank", "5px"],
					"buyables",
					["raw-html",function(){
						var effect="Enhancer Effect 1: Multiply 1st Generator Dimension by "+format(tmp.e.buyables[11].effect[0])+"<br>";
						if(player.e.best.gte(100))effect+="Enhancer Effect 2: Multiply Prestige Point gain by "+format(tmp.e.buyables[11].effect[1])+"<br>";
						if(player.e.best.gte(5000))effect+="Enhancer Effect 3: Add "+format(tmp.e.buyables[11].effect[2])+" to Booster Base<br>";
						if(player.e.best.gte(1e100))effect+="Enhancer Effect 4: Generator Upgrade 13's base +"+format(tmp.e.buyables[11].effect[3])+"<br>";
						if(player.e.best.gte("1e1000"))effect+="Enhancer Effect 5: Multiply Booster Boost effect by "+format(tmp.e.buyables[11].effect[4])+"<br>";
						if(hasUpgrade("e",42))effect+="Enhancer Effect 6: Multiply All Super-Generator Dimensions by "+format(tmp.e.buyables[11].effect[5])+"<br>";
						if(hasUpgrade("e",43))effect+="Enhancer Effect 7: Multiply Quirk Gain by "+format(tmp.e.buyables[11].effect[6])+"<br>";
						return "Enhancer Strength: "+format(tmp.e.getStrength)+"<br>Your "+format(player.e.buyables[11])+" Enhancers are providing these effects:<br>"+effect}
					],
						"milestones",
                   "upgrades"],
		upgrades:{
		rows: 4,
		cols: 3,
		11: {
			title: "Enhance Upgrade 11",
            description: "Unspent Enhance Points boost Prestige Point gain.",
			cost: new Decimal(200),
			unlocked() { return true },
			effect() { 
				let base=100;
				if(hasUpgrade("e",41))base+=9900;
                let ret = Decimal.pow(base,Decimal.log10(player[this.layer].points.add(1)).pow(0.9))
                return ret;
			},
			effectDisplay() { return format(this.effect())+"x" },
		},
		12: {
			title: "Enhance Upgrade 12",
            description: "Enhancer Effect 1 is stronger based on Unspent Enhance Points.",
			cost: new Decimal(500),
			unlocked() { return true },
			effect() { 
				let base=100;
                let ret = Decimal.pow(base,Decimal.log10(player[this.layer].points.add(1)).pow(0.9))
                return ret;
			},
			effectDisplay() { return format(this.effect())+"x" },
		},
		13: {
			title: "Enhance Upgrade 13",
            description: "The Generator Power effect is raised to the power of 1.15.",
			cost: new Decimal(1e12),
			unlocked() { return true },
		},
		21: {
			title: "Enhance Upgrade 21",
            description: "Prestige Points boost Enhance Point gain.",
			cost: new Decimal(1e25),
			unlocked() { return true },
			effect() { 
				let base=1.005;
                let ret = Decimal.pow(base,Decimal.log10(player.p.points.add(1)).pow(0.9))
                return ret; },
			effectDisplay() { return format(this.effect())+"x" },
		},
		22: {
			title: "Enhance Upgrade 22",
            description: "Enhancers are stronger based on your Space Energy & Time Capsules.",
			cost: new Decimal(1e33),
			unlocked() { return true },
			effect() { 
				let ret = player.s.points.add(player.t.points).div(100).add(1);
				return ret;
			},
			effectDisplay() { return format(this.effect())+"x" },
		},
		23: {
			title: "Enhance Upgrade 23",
            description: "Unlock the 3rd Prestige Dimension.",
			cost: new Decimal(1e68),
			unlocked() { return true },
		},
		31: {
			title: "Enhance Upgrade 31",
            description: "Super-Booster base +0.5",
			cost: new Decimal(1e160),
			unlocked() { return player.sb.unlocked },
		},
		32: {
			title: "Enhance Upgrade 32",
            description: "Enhancers are stronger based on your Effective Super-Boosters.",
			cost: new Decimal(1e165),
			unlocked() { return player.sb.unlocked },
			effect() {
				let ret = tmp.sb.getEff.div(10).add(1);
				return ret;
			},
			effectDisplay() { return format(this.effect())+"x"  },
		},
		33: {
			title: "Enhance Upgrade 33",
            description: "Enhancers are stronger based on your Enhance Points.",
			cost: new Decimal("1e183"),
			unlocked() { return player.sb.unlocked },
			effect() {
				let ret = player.e.points.add(1e10).log10().log10().div(10).add(1);
				return ret;
			},
			effectDisplay() { return format(this.effect())+"x"  },
		},
		41: {
			title: "Enhance Upgrade 41",
			description: "Enhance Upgrade 1 is stronger.",
			cost: new Decimal("1e455"),
			unlocked() { return player.h.unlocked },
		},
		42: {
			title: "Enhance Upgrade 42",
			description: "Unlock Enhancer Effect 6.",
			cost: new Decimal("1e15300"),
			unlocked() { return player.ss.unlocked },
		},
		43: {
			title: "Enhance Upgrade 43",
			description: "Unlock Enhancer Effect 7.",
			cost: new Decimal("1e37500"),
			unlocked() { return player.ss.unlocked },
		},
	},
	doReset(l){
			if(l=="t" || l=="s" || l=="e" || l=="sb" || l=="sg"){return;}
			if(l=="h" || l=="q" || l=="ss" ){
					var b=new Decimal(player.e.best);
					if(player[l].best.gte(2) || l=="ss")layerDataReset("e",["upgrades"]);
					else layerDataReset("e",[]);
					player.e.best=b;
					return;
				}
			layerDataReset("e",[]);
		},
		
		
	 passiveGeneration(){
		 if(player.h.best.gte(10))return 1;
		 return 0;
	 },milestonePopups(){
			if(player.h.best.gte(1))return false;
		 return true;
	    },
	 hotkeys: [
           {key: "e", description: "E: Enhance reset", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
     ],
})

addLayer("sb", {
    name: "super-booster",
    symbol: "SB",
    position: 0,
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
		dim: new Decimal(0)
    }},
    color: "#494b99",
    requires: function(){
		return new Decimal(2320);
	},
    resource: "super-boosters",
    baseResource: "boosters", 
    baseAmount() {return player.b.points},
    type: "static",
	base: 1.05,
    exponent: 1.25,
    gainMult() {
        mult = new Decimal(1)
		return mult
    },
    gainExp() {
        return new Decimal(1)
    },
    row: 2,
    hotkeys: [],
    layerShown(){return hasUpgrade("p",42) || player.sb.unlocked},
	branches: ["b"],
	effect() {
			let base=new Decimal(1.5);
			if(hasUpgrade("e",31))base=base.add(0.5);
			if(hasUpgrade("sb",11))base=base.add(upgradeEffect("sb",11));
			if(hasUpgrade("t",42))base=base.add(upgradeEffect("t",42));
			let ret = Decimal.pow(base,tmp.sb.getEff);
			return ret;
		},
	 effectDescription() { // Optional text to describe the effects
           eff = this.effect();
           return "which are multiplying the Booster Boost effect by "+format(eff);
       },
	   upgrades: {
            rows: 2,
            cols: 3,
			11: {
                title: "Super-Booster Upgrade 11",
                description: "Super-Boosters are stronger based on your Prestige Points.",
                cost: new Decimal(2),
                unlocked() { return true }, // The upgrade is only visible when this is true
				effect() { // Calculate bonuses from the upgrade. Can return a single value or an object with multiple values
                    let ret = player.p.points.add(1e10).log10().log10().div(20);
					return ret;
                },
                effectDisplay() { return "+"+format(this.effect())+" to the base" }, // Add formatting to the effect
            },
			12: {
                title: "Super-Booster Upgrade 12",
                description: "All Booster Dimensions is boosted by Super-Boosters.",
                cost: new Decimal(15),
                unlocked() { return player.h.unlocked },
				effect() { // Calculate bonuses from the upgrade. Can return a single value or an object with multiple values
                    let ret = player.sb.points.mul(Decimal.pow(10,player.sb.points.pow(0.8)));
					return ret;
                },
                effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
            },
			13: {
                title: "Super-Booster Upgrade 13",
                description: "Unlock more Booster Upgrades.",
                cost: new Decimal(22),
                unlocked() { return player.q.unlocked },
            },
			21: {
                title: "Super-Booster Upgrade 21",
                description: "Point gain is boosted by your Super-Boosters.",
                cost: new Decimal(32),
                unlocked() { return player.ss.unlocked },
				effect() { // Calculate bonuses from the upgrade. Can return a single value or an object with multiple values
                    let ret = Decimal.pow(10,player.sb.points.pow(3));
					return ret;
                },
                effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
            },
			22: {
                title: "Super-Booster Upgrade 22",
                description: "Effective Super-Boosters exponent +0.01",
                cost: new Decimal(35),
                unlocked() { return player.ss.unlocked },
            },
			23: {
                title: "Super-Booster Upgrade 23",
                description: "Unlock Solarity",
                cost: new Decimal(37),
                unlocked() { return player.ss.unlocked },
            },
		},
		milestones: {
            0: {requirementDescription: "1 Super-Boosters",
                done() {return player[this.layer].best.gte(1)}, // Used to determine when to give the milestone
                effectDescription: "Keep Booster/Generator milestones on reset, keep Prestige upgrades on reset, you can buy max Super-Boosters",
            },
		},
		canBuyMax() {return player[this.layer].best.gte(1)},
		milestonePopups(){
			if(player.h.best.gte(1))return false;
		 return true;
	    },
	 	 tabFormat: ["main-display",
					["display-text",
                        function() {
							return 'You have '+format(tmp.sb.getEff)+' effective super-boosters.';},
                        {}],
                    "prestige-button", "resource-display",
                    ["blank", "5px"],
						"milestones",
                   "upgrades"],
				   
	getEffExp(){
		let exponent=new Decimal(0.55);
		if(hasUpgrade("sb",22))exponent=exponent.add(0.01);
		return exponent;
	},
	getEffMul(){
		let mult=new Decimal(1);
		return mult;
	},
	getEff(){
		let ret=player.sb.points.pow(tmp.sb.getEffExp).mul(tmp.sb.getEffMul);
		if(hasUpgrade("sg",13))ret=ret.add(upgradeEffect("sg",13));
		return ret;
	},
		doReset(l){
			if(l=="t" || l=="s" || l=="e" || l=="sb" || l=="sg"){return;}
			if(l=="h" || l=="q" || l=="ss"){
					var b=new Decimal(player.sb.best);
					if(player[l].best.gte(2) || l=="ss")layerDataReset("sb",["upgrades"]);
					else layerDataReset("sb",[]);
					player.sb.best=b;
					if(hasUpgrade("h",12))player.sb.points=new Decimal(1);
					return;
				}
			layerDataReset("sb",[]);
		},
		autoPrestige(){
		 return player.h.best.gte(50);
	 },resetsNothing(){
		 return player.h.best.gte(50);
	 },
	 hotkeys: [
           {key: "B", description: "Shift+B: Super-Booster reset", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
     ],
	 update(diff){
	 }
})


addLayer("h", {
    name: "hindrance spirit",
    symbol: "H",
    position: 0,
    startData() { return {
        unlocked: false,
		points: new Decimal(0)
    }},
    color: "#a14040",
    requires: function(){
		return new Decimal("1e525");
	},
    resource: "hindrance spirit",
    baseResource: "time energy", 
    baseAmount() {return player.t.energy},
    type: "normal",
    exponent: .022,
    gainMult() {
        mult = new Decimal(1)
		return mult
    },
    gainExp() {
        return new Decimal(1)
    },
    row: 3,
    hotkeys: [],
    layerShown(){return hasUpgrade("e",33) || player.h.unlocked},
	branches: ["t"],
	effect() {
			return player.h.points.add(1);
		},
	effectDescription() { // Optional text to describe the effects
           eff = this.effect();
           return "which are multiplying All Time Dimension productions and Time Upgrade 11 by "+format(eff);
       },
	milestones: {
            0: {requirementDescription: "1 Hindrance Spirit",
                done() {return player[this.layer].best.gte(1)}, // Used to determine when to give the milestone
                effectDescription: "Keep all milestones and prestige upgrades on all 4th row resets, autobuy Time Dimensions, buying Time Dimensions doesn't cost any boosters, and gain 10000x more Enhance Points",
            },
			1: {requirementDescription: "2 Hindrance Spirit",
                done() {return player[this.layer].best.gte(2)}, // Used to determine when to give the milestone
                effectDescription: "Keep all 3rd row upgrades on reset, autobuy Enhancers, buying Enhancers doesn't cost any Enhance Points, and gain 10000x more Enhance Points",
            },
			2: {requirementDescription: "3 Hindrance Spirit",
                done() {return player[this.layer].best.gte(3)}, // Used to determine when to give the milestone
                effectDescription: "Autobuy Space Buildings, buying Space Buildings doesn't cost any Generator Power, and gain 10000x more Enhance Points",
            },
			3: {requirementDescription: "10 Hindrance Spirit",
                done() {return player[this.layer].best.gte(10)}, // Used to determine when to give the milestone
                effectDescription: "Gain 10000x more Enhance Points, and gain 100% of Enhance Point gain every second",
            },
			4: {requirementDescription: "30 Hindrance Spirit",
                done() {return player[this.layer].best.gte(30)}, // Used to determine when to give the milestone
                effectDescription: "Autobuy Time Capsules, Time reset does nothing, and gain 10000x more Enhance Points",
            },
			5: {requirementDescription: "50 Hindrance Spirit",
                done() {return player[this.layer].best.gte(50)}, // Used to determine when to give the milestone
                effectDescription: "Autobuy Super-Boosters, Super-Booster reset does nothing, and gain 10000x more Enhance Points",
            },
			6: {requirementDescription: "100 Hindrance Spirit",
                done() {return player[this.layer].best.gte(100)}, // Used to determine when to give the milestone
                effectDescription: "Unlock the first challenge, Autobuy Space Energy, Space reset does nothing, and gain 10000x more Enhance Points",
            },
			7: {requirementDescription: "1000 Hindrance Spirit",
                done() {return player[this.layer].best.gte(1000)}, // Used to determine when to give the milestone
                effectDescription: "Unlock the second challenge.",
            },
			8: {requirementDescription: "1e9 Hindrance Spirit",
                done() {return player[this.layer].best.gte(1e9)}, // Used to determine when to give the milestone
                effectDescription: "Unlock the third challenge.",
            },
			9: {requirementDescription: "1e11 Hindrance Spirit",
                done() {return player[this.layer].best.gte(1e11)}, // Used to determine when to give the milestone
                effectDescription: "Unlock the fourth challenge.",
            },
			10: {requirementDescription: "1e24 Hindrance Spirit",
                done() {return player[this.layer].best.gte(1e24)}, // Used to determine when to give the milestone
                effectDescription: "Unlock the fifth challenge, complete this challenge will unlock a new layer.",
            },
			11: {requirementDescription: "1e48 Hindrance Spirit",
                done() {return player[this.layer].best.gte(1e48)}, // Used to determine when to give the milestone
                effectDescription: "Unlock the sixth challenge, and gain 100x more Quirks",
            },
			12: {requirementDescription: "1e96 Hindrance Spirit",
                done() {return player[this.layer].best.gte(1e96)}, // Used to determine when to give the milestone
                effectDescription: "Unlock the seventh challenge, complete this challenge will unlock a new layer.",
            },
			13: {requirementDescription: "1e144 Hindrance Spirit",
                done() {return player[this.layer].best.gte(1e144)}, // Used to determine when to give the milestone
                effectDescription: "Autobuy Super-Generators, Super-Generator reset does nothing",
            },
			14: {requirementDescription: "1e192 Hindrance Spirit",
                done() {return player[this.layer].best.gte(1e192)}, // Used to determine when to give the milestone
                effectDescription: "Unlock the eighth challenge, complete this challenge will unlock a new layer.",
            },
		},
		milestonePopups(){
		 return true;
	    },
		
		
		
		
		challenges: {
            rows: 4,
    		cols: 2,
		    11: {
                name: "Dimensional Hindrance 1",
                completionLimit: 5,
			    challengeDescription() {return "2nd Prestige Dimension does nothing.<br>"+challengeCompletions(this.layer, this.id) +"/5 completions"},
                unlocked() { return player[this.layer].best.gt(100) },
                goal: function(){return [new Decimal("1e12345"),new Decimal("1e15750"),new Decimal("1e57000"),new Decimal("1e150000"),new Decimal("1e194000"),new Decimal(Infinity)][player.h.challenges[11]];},
                currencyDisplayName: "points",
                currencyInternalName: "points",
                rewardEffect() {
                    let ret = player.h.challenges[11];
                    return ret;
                },
                rewardDisplay() { return "Unlock "+formatWhole(this.rewardEffect())+" new types of Prestige Dimension." },
                rewardDescription() { return "Each completion of the challenge unlocks a new type of Prestige Dimension." },
            },
			12: {
                name: "Dimensional Hindrance 2",
                completionLimit: 3,
			    challengeDescription() {return "1st Booster Dimension does nothing.<br>"+challengeCompletions(this.layer, this.id) +"/3 completions"},
                unlocked() { return player[this.layer].best.gt(1000) },
                goal: function(){return [new Decimal("1e13650"),new Decimal("1e25400"),new Decimal("1e700000"),new Decimal(Infinity)][player.h.challenges[12]];},
                currencyDisplayName: "points",
                currencyInternalName: "points",
                rewardEffect() {
                    let ret = player.h.challenges[12];
                    return ret;
                },
                rewardDisplay() { return "Unlock "+formatWhole(this.rewardEffect())+" new Booster Upgrades. Unlock "+formatWhole(this.rewardEffect())+" new types of Booster Dimension." },
                rewardDescription() { return "Each completion of the challenge unlocks a Booster Upgrade and a new type of Booster Dimension." },
            },
			21: {
                name: "Dimensional Hindrance 3",
                completionLimit: 3,
			    challengeDescription() {return "1st Generator Dimension does nothing.<br>"+challengeCompletions(this.layer, this.id) +"/3 completions"},
                unlocked() { return player[this.layer].best.gt(1e9) },
                goal: function(){return [new Decimal("1e14800"),new Decimal("1e107500"),new Decimal("1e335000"),new Decimal(Infinity)][player.h.challenges[21]];},
                currencyDisplayName: "points",
                currencyInternalName: "points",
                rewardEffect() {
                    let ret = player.h.challenges[21];
                    return ret;
                },
                rewardDisplay() { return "Unlock "+formatWhole(this.rewardEffect())+" new Generator Upgrades. Unlock "+formatWhole(this.rewardEffect())+" new types of Generator Dimension." },
                rewardDescription() { return "Each completion of the challenge unlocks a Generator Upgrade and a new type of Generator Dimension."},
            },
			22: {
                name: "No Prestige",
                completionLimit: 4,
			    challengeDescription() {return "You can't gain any prestige points<br>"+challengeCompletions(this.layer, this.id) +"/4 completions"},
                unlocked() { return player[this.layer].best.gt(1e11) },
                goal: function(){return [new Decimal("1e5900"),new Decimal("1e16500"),new Decimal("1e36000"),new Decimal("1e118500"),new Decimal(Infinity)][player.h.challenges[22]];},
                currencyDisplayName: "points",
                currencyInternalName: "points",
                rewardEffect() {
                    let ret = player.h.challenges[22];
                    return ret;
                },
                rewardDisplay() { return "Unlock "+formatWhole(this.rewardEffect())+" new Prestige Upgrades." },
                rewardDescription() { return "Each completion of the challenge unlocks a Prestige Upgrade." },
            },
			31: {
                name: "Skip the Second",
                completionLimit: Infinity,
			    challengeDescription() {return "Boosters and Generators do nothing<br>"+challengeCompletions(this.layer, this.id) +" completions"},
                unlocked() { return player[this.layer].best.gt(1e24) },
                goal: function(){return Decimal.pow(10,Decimal.pow(1.1,player.h.challenges[31]).mul(6050));},
                currencyDisplayName: "points",
                currencyInternalName: "points",
                rewardEffect() {
                    let ret = Math.pow(player.h.challenges[31],0.5)/100;
                    return ret;
                },
                rewardDisplay() { return "Generator Power gain is multiplied by Booster multiplier^"+format(this.rewardEffect()) },
                rewardDescription() { return "Unlock a new layer and Hindrance upgrades. Generator Power gain is boosted based on Booster multiplier and challenge completions." },
            },
			32: {
                name: "Dimensional Hindrance 4",
                completionLimit: 2,
			    challengeDescription() {return "1st Time Dimension does nothing.<br>"+challengeCompletions(this.layer, this.id) +"/2 completions"},
                unlocked() { return player[this.layer].best.gt(1e48) },
                goal: function(){return [new Decimal("1e97000"),new Decimal("1e234567"),new Decimal(Infinity)][player.h.challenges[32]];},
                currencyDisplayName: "points",
                currencyInternalName: "points",
                rewardEffect() {
                    let ret = player.h.challenges[32];
                    return ret;
                },
                rewardDisplay() { return "Unlock "+formatWhole(this.rewardEffect())+" new Time Upgrades. Unlock "+formatWhole(this.rewardEffect())+" new types of Time Dimension." },
                rewardDescription() { return "Each completion of the challenge unlocks a Time Upgrade and a new type of Time Dimension." },
            },
			41: {
                name: "No Generator Power",
                completionLimit: 1,
			    challengeDescription() {return "You can't gain any Generator Power, Hindrance Upgrade 11 is disabled."},
                unlocked() { return player[this.layer].best.gt(1e96) },
                goal: function(){return new Decimal("1e43750");},
                currencyDisplayName: "points",
                currencyInternalName: "points",
                rewardDescription: "Unlock Super-Generators.",
            },
			42: {
                name: "Impaired Nodes",
                completionLimit: 1,
			    challengeDescription() {return "Enhancers, 1st Time Dimension, and Space Buildings do nothing."},
                unlocked() { return player[this.layer].best.gt(1e192) },
                goal: function(){return new Decimal("1e88000");},
                currencyDisplayName: "points",
                currencyInternalName: "points",
                rewardDescription: "Unlock Subspace. Gain 100% of Hindrance Spirit and Quirk gain per second. ",
            },
			
        },
	 hotkeys: [
           {key: "h", description: "H: Hindrance reset", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
     ],
		
	   upgrades: {
            rows: 2,
            cols: 3,
			11: {
                title: "Hindrance Upgrade 11",
                description: "Gain Generator Power based on Hindrance Spirit.",
                cost: new Decimal(1e29),
                unlocked() { return player.h.challenges[31]>=1 }, // The upgrade is only visible when this is true
				effect() { // Calculate bonuses from the upgrade. Can return a single value or an object with multiple values
					if(player.h.activeChallenge==41)return new Decimal(0);
                    let base=2;
                    if(hasUpgrade("h",21))base+=3;
                    let ret = Decimal.pow(base,Decimal.log10(player[this.layer].points.add(1)).pow(0.9));
                    //if (ret.gte("1e20000000")) ret = ret.sqrt().times("1e10000000")
                    return ret;
                },
                effectDisplay() { return "+"+format(this.effect())+"/s" }, // Add formatting to the effect
            },
			12: {
                title: "Hindrance Upgrade 12",
                description: "Gain a Super-Booster on Hindrance reset.",
                cost: new Decimal(1e34),
                unlocked() { return player.h.challenges[31]>=1 }, // The upgrade is only visible when this is true
            },
			13: {
                title: "Hindrance Upgrade 13",
                description: "Hindrance Spirit gain is boosted based on Quirks.",
                cost: new Decimal(1e47),
                unlocked() { return player.q.unlocked }, // The upgrade is only visible when this is true
				effect() { // Calculate bonuses from the upgrade. Can return a single value or an object with multiple values
                    let base=2;
                    let ret = Decimal.pow(base,Decimal.log10(player.q.points.add(1)).pow(0.9));
                    //if (ret.gte("1e20000000")) ret = ret.sqrt().times("1e10000000")
                    return ret;
                },
                effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
            },
			21: {
                title: "Hindrance Upgrade 21",
                description: "Hindrance Upgrade 11 is better.",
                cost: new Decimal(1e80),
                unlocked() { return player.q.unlocked },
            },
		},
		
		update(diff){
			if(hasUpgrade("h",11))player.g.power=player.g.power.add(upgradeEffect("h",11).mul(diff)).max(0);
		},
	softcap: new Decimal(Infinity),
	softcapPower: new Decimal(1),
	 passiveGeneration(){
		 if(player.h.challenges[42]>=1)return 1;
		 return 0;
	 },
})


addLayer("q", {
    name: "quirks",
    symbol: "Q",
    position: 1,
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
		dim: new Decimal(0),
		energy: new Decimal(0),
		time1: 0
    }},
    color: "#ff2bf2",
    requires: function(){
		return new Decimal("1e8000");
	},
    resource: "quirks",
    baseResource: "generator power", 
    baseAmount() {return player.g.power},
    type: "normal",
    exponent: .001,
    gainMult() {
        mult = new Decimal(1)
		if(player.h.best.gte("1e48"))mult=mult.mul(100);
		if(hasUpgrade("q",13))mult=mult.mul(upgradeEffect("q",13));
		if(hasUpgrade("e",43))mult=mult.mul(tmp.e.buyables[11].effect[6]);
		return mult
    },
    gainExp() {
        return new Decimal(1)
    },
    row: 3,
    hotkeys: [],
    layerShown(){return player.h.challenges[31]>=1 || player.q.unlocked},
	branches: ["e"],
	softcap: new Decimal(Infinity),
	softcapPower: new Decimal(1),
		milestones: {
            0: {requirementDescription: "2 Quirks",
                done() {return player[this.layer].best.gte(2)}, // Used to determine when to give the milestone
                effectDescription: "Keep all 3rd row upgrades on reset",
            },
		},
		
		
	buyables: {
            rows: 1,
            cols: 1,
            11: {
                title: "Quirk Layer", // Optional, displayed at the top in a larger font
                cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                    let cost = Decimal.pow(2, x.pow(1.5))
                    return cost
                },
                effect(x=player[this.layer].buyables[this.id]) { // Effects of owning x of the items, x is a decimal
					x=x.mul(tmp.q.getStrength);
					let base=new Decimal(3);
					if(hasUpgrade("q",21))base=base.add(upgradeEffect("q",21));
					let eff = x.mul(Decimal.pow(base,x));
					if(hasUpgrade("q",23))eff=eff.mul(upgradeEffect("q",23));
                    return eff;
                },
                display() { // Everything else displayed in the buyable button after the title
                    let data = tmp[this.layer].buyables[this.id]
                    return "Cost: " + format(data.cost) + " Quirks\n\
                    Amount: " + player[this.layer].buyables[this.id] + "\n\
                    Currently: Generate "+format(data.effect)+" Quirk Energy/sec";
                },
                unlocked() { return hasUpgrade("q",12) }, 
                canAfford() {
                    return player[this.layer].points.gte(tmp[this.layer].buyables[this.id].cost)},
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
					player[this.layer].points = player[this.layer].points.sub(cost)	
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                    player[this.layer].spentOnBuyables = player[this.layer].spentOnBuyables.add(cost) // This is a built-in system that you can use for respeccing but it only works with a single Decimal value
                },
                buyMax() {}, // You'll have to handle this yourself if you want
                style: {'height':'222px'},
                
            },
        },
		upgrades: {
            rows: 2,
            cols: 3,
			11: {
				title: "Quirk Upgrade 11",
                description: "Quirks & Hindrance Spirit boost All Prestige Dimensions, Prestige Point gain and Enhance Point gain.",
                cost: new Decimal(2),
                unlocked() { return true }, // The upgrade is only visible when this is true
				effect() { // Calculate bonuses from the upgrade. Can return a single value or an object with multiple values
                    let base=3;
                    let ret = Decimal.pow(base,Decimal.log10(player.q.points.add(1).times(player.h.points.add(1))).pow(0.9));
                    //if (ret.gte("1e20000000")) ret = ret.sqrt().times("1e10000000")
                    return ret;
                },
                effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
            },
			12: {
				title: "Quirk Upgrade 12",
                description: "Unlock Quirk Layer.",
                cost: new Decimal(4),
                unlocked() { return true }, // The upgrade is only visible when this is true
            },
			13: {
				title: "Quirk Upgrade 13",
                description: "Quirk gain is boosted based on Hindrance Spirit.",
                cost: new Decimal(100),
                unlocked() { return true }, // The upgrade is only visible when this is true
				effect() { // Calculate bonuses from the upgrade. Can return a single value or an object with multiple values
                    let base=1.1;
                    let ret = Decimal.pow(base,Decimal.log10(player.h.points.add(1)).pow(0.9));
                    //if (ret.gte("1e20000000")) ret = ret.sqrt().times("1e10000000")
                    return ret;
                },
                effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
            },
			21: {
				title: "Quirk Upgrade 21",
                description: "Quirk Layer's base is increasing over time.",
                cost: new Decimal(1e22),
                unlocked() { return true }, // The upgrade is only visible when this is true
				effect() { // Calculate bonuses from the upgrade. Can return a single value or an object with multiple values
                    let ret = new Decimal(player.q.time1);
					if(hasUpgrade("q",22))ret=new Decimal(player.timePlayed);
                    return ret;
                },
                effectDisplay() { return "+"+format(this.effect()) }, // Add formatting to the effect
            },
			22: {
				title: "Quirk Upgrade 22",
                description: "Quirk Upgrade 21 now based on your total time played this game.",
                cost: new Decimal(1e23),
                unlocked() { return true },
            },
			23: {
				title: "Quirk Upgrade 23",
                description: "Quirk Energy gain is boosted by your quirks.",
                cost: new Decimal(1e36),
				effect() { // Calculate bonuses from the upgrade. Can return a single value or an object with multiple values
                    let base=4;
                    let ret = Decimal.pow(base,Decimal.log10(player.q.points.add(1)).pow(0.9));
                    //if (ret.gte("1e20000000")) ret = ret.sqrt().times("1e10000000")
                    return ret;
                },
                effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
                unlocked() { return true },
            }
		},
		getStrength() {
			return new Decimal(1);
		},
		
		update(diff){
			if(hasUpgrade("q",12))player.q.energy=player.q.energy.add(tmp.q.buyables[11].effect.mul(diff)).max(0);
			if(hasUpgrade("q",21))player.q.time1+=diff;
		},
		
	tabFormat: ["main-display",
                    "prestige-button", "resource-display",
					"milestones",
                    ["blank", "5px"],
					"buyables",
                    ["display-text",
                        function() {return 'You have ' + format(player.q.energy) + ' Quirk Energy (generated by Quirk Layers), which multiplies All Prestige Dimensions, Generator Power and Space gain by '+ format(tmp.q.quirkEff) },
                        {}],
                   "upgrades"],
				   
				   quirkEff(){
					   let x=player.q.energy.add(1);
					   return x;
				   },
	 hotkeys: [
           {key: "q", description: "Q: Quirk reset", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
     ],
	 passiveGeneration(){
		 if(player.h.challenges[42]>=1)return 1;
		 return 0;
	 },
})


addLayer("sg", {
    name: "super-generator",
    symbol: "SG",
    position: 4,
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
		power: new Decimal(0),
		extra: new Decimal(0),
		dim1: new Decimal(0),
		dim2: new Decimal(0),
		dim3: new Decimal(0),
		dim4: new Decimal(0),
		dim5: new Decimal(0),
		dim6: new Decimal(0),
		dim7: new Decimal(0),
		dim8: new Decimal(0),
    }},
    color: "#409c6e",
    requires: function(){
		return new Decimal(25000);
	},
    resource: "super-generators",
    baseResource: "generators", 
    baseAmount() {return player.g.points},
    type: "static",
	base: 1.05,
    exponent: 1.25,
    gainMult() {
        mult = new Decimal(1)
		return mult
    },
    gainExp() {
        return new Decimal(1)
    },
    row: 2,
    hotkeys: [],
    layerShown(){return player.h.challenges[41]>=1 || player.sg.unlocked},
	branches: ["g"],
	effect() {
			let ret = player.sg.points;
			if(hasUpgrade("sg",11))ret=ret.mul(upgradeEffect("sg",11));
			if(hasUpgrade("sg",12))ret=ret.mul(upgradeEffect("sg",12));
			if(hasUpgrade("ss",13))ret=ret.mul(upgradeEffect("ss",13));
			return ret;
		},
	effectDescription() { // Optional text to describe the effects
           eff = this.effect();
           return "which are generating "+format(eff)+" Super-Generator Power/sec"
       },
	 hotkeys: [
           {key: "G", description: "Shift+G: Super-Generator reset", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
     ],
	 
	   	extraeffect() {
			let ret = player.sg.extra;
			if(hasUpgrade("sg",11))ret=ret.mul(upgradeEffect("sg",11));
			if(hasUpgrade("sg",12))ret=ret.mul(upgradeEffect("sg",12));
			if(hasUpgrade("ss",13))ret=ret.mul(upgradeEffect("ss",13));
			return ret;
		},
	 update(diff){
		 player.sg.power = player.sg.power.add(tmp.sg.effect.add(tmp.sg.extraeffect).times(diff)).max(0)
		 if(hasUpgrade("sg",21))player.sg.extra=player.sg.extra.add(tmp.sg.buyables[11].effect.times(diff)).max(0)
			 
		 if(player.sg.best.gte(16)){
			 
				if(hasUpgrade("sg",21)){
					target=player.sg.power.add(1).log(2).pow(1/1.35).add(1).floor();
					if(target.gt(player.sg.buyables[11])){
						player.sg.dim1=player.sg.dim1.add(target.sub(player.sg.buyables[11]));
						player.sg.buyables[11]=target;
					}
				}
		 }
	 },
	getSuperGenPowerEffExp() {
		let exp = new Decimal(75);
		return exp;
	},
	getSuperGenPowerEff() {
		let eff = player.sg.power.add(1).pow(tmp.sg.getSuperGenPowerEffExp);
		return eff
	},
		doReset(l){
			if(l=="t" || l=="s" || l=="e" || l=="sb" || l=="sg"){return;}
			if(l=="h" || l=="q" || l=="ss"){
					var b=new Decimal(player.sg.best);
					if(player[l].best.gte(2) || l=="ss")layerDataReset("sg",["upgrades"]);
					else layerDataReset("sg",[]);
					player.sg.best=b;
				return;
			}
			layerDataReset("sg",[]);
		},
	 tabFormat: ["main-display",
                    "prestige-button", "resource-display",
                    ["blank", "5px"],
                    ["display-text",
                        function() {return 'You have ' + format(player.sg.power) + ' Super-Generator Power, which multiplies All Generator Dimensions by ' + format(tmp.sg.getSuperGenPowerEff)},
                        {}],["display-text",
                        function() {return 'You have ' + format(player.sg.extra) + ' Extra Super-Generators, which are generating '+format(tmp.sg.extraeffect)+' Super-Generator Power/sec'},
                        {}],
						"buyables",
						"milestones",
                   "upgrades"],
		upgrades: {
            rows: 2,
            cols: 3,
			11: {
				title: "Super-Generator Upgrade 11",
                description: "Non-extra Super-Generators boost Super-Generator Power gain.",
                cost: new Decimal(5),
                unlocked() { return true }, // The upgrade is only visible when this is true
				effect() { // Calculate bonuses from the upgrade. Can return a single value or an object with multiple values
                    let base=new Decimal(1.15);
                    let ret = Decimal.pow(base,player.sg.points);
                    //if (ret.gte("1e20000000")) ret = ret.sqrt().times("1e10000000")
                    return ret;
                },
                effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
            },
			12: {
				title: "Super-Generator Upgrade 12",
                description: "Super-Generator Power boost Super-Generator Power gain.",
                cost: new Decimal(6),
                unlocked() { return true }, // The upgrade is only visible when this is true
				effect() { // Calculate bonuses from the upgrade. Can return a single value or an object with multiple values
                    let base=2;
                    let ret = Decimal.pow(base,player.sg.power.add(1).log10().pow(0.9));
                    //if (ret.gte("1e20000000")) ret = ret.sqrt().times("1e10000000")
                    return ret;
                },
                effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
            },
			13: {
				title: "Super-Generator Upgrade 13",
                description: "Super-Generators provide effective Super-Boosters.",
                cost: new Decimal(7),
                unlocked() { return true }, // The upgrade is only visible when this is true
				effect() {
					return player.sg.points.div(100).pow(0.3);
                },
                effectDisplay() { return "+"+format(this.effect())+" Effective SB" }, // Add formatting to the effect
            },
			21: {
				title: "Super-Generator Upgrade 21",
                description: "Unlock 1st Super-Generator Dimension.",
                cost: new Decimal(13),
                unlocked() { return player.ss.unlocked },
            },
			22: {
				title: "Super-Generator Upgrade 22",
                description: "Generator Power boost All Super-Generator Dimensions.",
                cost: new Decimal(14),
                unlocked() { return true }, // The upgrade is only visible when this is true
				effect() { // Calculate bonuses from the upgrade. Can return a single value or an object with multiple values
                    let base=1.0005;
                    let ret = Decimal.pow(base,player.g.power.add(1).log10().pow(0.8));
                    //if (ret.gte("1e20000000")) ret = ret.sqrt().times("1e10000000")
                    return ret;
                },
                effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
            },
			23: {
				title: "Super-Generator Upgrade 23",
                description: "Non-extra Super-Generators add to the Generator Upgrade 13's base.",
                cost: new Decimal(19),
                unlocked() { return true }, // The upgrade is only visible when this is true
				effect() { // Calculate bonuses from the upgrade. Can return a single value or an object with multiple values
                    let ret = player.sg.points.add(1).log10().add(1).log10().div(10);
                    return ret;
                },
                effectDisplay() { return "+"+format(this.effect())+" to the base" }, // Add formatting to the effect
            },
		},
		milestones: {
            0: {requirementDescription: "1 Super-Generators",
                done() {return player[this.layer].best.gte(1)}, // Used to determine when to give the milestone
                effectDescription: "Keep Booster/Generator milestones on reset, keep Prestige upgrades on reset, you can buy max Super-Generators",
            },
			1: {requirementDescription: "16 Super-Generators",
                done() {return player[this.layer].best.gte(16)},
                effectDescription: "Automatically buy Super-Generator Dimensions and buying Super-Generator Dimensions costs nothing",
            },
		},
		canBuyMax() {return player[this.layer].best.gte(1)},
		milestonePopups(){
			if(player.h.best.gte(1))return false;
		 return true;
	    },
	 autoPrestige(){
		 return player.h.best.gte(1e144);
	 },resetsNothing(){
		 return player.h.best.gte(1e144);
	 },
	buyables: {
            rows: 4,
            cols: 2,
            11: {
                title: "1st Super-Generator Dimension", // Optional, displayed at the top in a larger font
                cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                    let cost = Decimal.pow(2, x.pow(1.35))
                    return cost
                },
                effect() {
					let gain=player.sg.dim1;
					gain = gain.mul(Decimal.pow(2,player.sg.buyables[11]));
					if(hasUpgrade("e",42))gain=gain.mul(tmp.e.buyables[11].effect[5]);
					if(hasUpgrade("sg",22))gain=gain.mul(upgradeEffect("sg",22));
					return gain;
                },
                display() { // Everything else displayed in the buyable button after the title
                    let data = tmp[this.layer].buyables[this.id]
                    return "You have "+format(player.sg.dim1)+" 1st Super-Generator Dimensions. ("+format(player.sg.buyables[11])+" bought)<br>"+
                    "They are producing "+format(data.effect)+" Extra Super-Generators per second.<br>"+
					"Cost for Next 1st Super-Generator Dimension: "+format(data.cost)+" Super-Generator Power";
                },
                unlocked() { return hasUpgrade("sg",21) }, 
                canAfford() {
                    return player[this.layer].power.gte(tmp[this.layer].buyables[this.id].cost)},
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
                    if(player.sg.best.lt(16))player[this.layer].power = player[this.layer].power.sub(cost)
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                    player[this.layer].spentOnBuyables = player[this.layer].spentOnBuyables.add(cost) // This is a built-in system that you can use for respeccing but it only works with a single Decimal value
					player[this.layer].dim1 = player[this.layer].dim1.add(1)
                },
                buyMax() {}, // You'll have to handle this yourself if you want
                style: {'height':'222px'},
            },
	}
})

addLayer("ss", {
    name: "subspace",
    symbol: "SS",
    position: 5,
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
		subspace: new Decimal(0),
		dim1: new Decimal(0),
		dim2: new Decimal(0),
		dim3: new Decimal(0),
		dim4: new Decimal(0),
		dim5: new Decimal(0),
		dim6: new Decimal(0),
		dim7: new Decimal(0),
		dim8: new Decimal(0),
    }},
    color: "white",
    requires: function(){
		return new Decimal(272);
	},
    resource: "subspace energy",
    baseResource: "space energy", 
    baseAmount() {return player.s.points},
    type: "static",
	base: 1.07,
    exponent: 1.15,
    gainMult() {
        mult = new Decimal(1)
		return mult
    },
    gainExp() {
        return new Decimal(1)
    },
    row: 3,
    hotkeys: [],
    layerShown(){return player.h.challenges[42]>=1 || player.ss.unlocked},
	branches: ["s"],
	effect() {
			let ret = player.ss.points.mul(Decimal.pow(2,player.ss.points));
			return ret;
		},
	effectDescription() { // Optional text to describe the effects
           eff = this.effect();
           return "which are multiplying all Subspace Dimensions by "+format(eff)
       },
	 hotkeys: [
           {key: "S", description: "Shift+S: Subspace reset", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
     ],
	 update(diff){
		 player.ss.subspace=player.ss.subspace.add(tmp.ss.buyables[11].effect.mul(diff));
	 },
		doReset(l){
		},
	 tabFormat: ["main-display",
                    "prestige-button", "resource-display",
                    ["blank", "5px"],
                    ["display-text",
                        function() {return 'You have ' + format(player.ss.subspace) + ' subspace, which are providing ' + format(tmp.ss.getFreeLevel) + ' Free Space Building 5 and 6 levels, and making space buildings ' + format(tmp.ss.getAddStrength.sub(1).mul(100)) +'% stronger'},
                        {}],
						"buyables",
						"milestones",
                   "upgrades"],
		milestonePopups(){
		 return true;
	    },
		
		getFreeLevel(){
			let ret=Decimal.log10(player.ss.subspace.add(1)).pow(0.7).mul(2.5);
			if(hasUpgrade("ss",11))ret=ret.mul(upgradeEffect("ss",11));
			return ret;
		},
		getAddStrength(){
			let ret=Decimal.log10(player.ss.subspace.add(1)).add(1).log10().mul(0.1);
			if(hasUpgrade("ss",12))ret=ret.mul(upgradeEffect("ss",12));
			ret=ret.add(1);
			return ret;
		},
		upgrades: {
            rows: 1,
            cols: 3,
			11: {
				title: "Subspace Upgrade 11",
                description: "First subspace effect is boosted by your subspace energy.",
                cost: new Decimal(2),
                unlocked() { return true }, // The upgrade is only visible when this is true
				effect() { // Calculate bonuses from the upgrade. Can return a single value or an object with multiple values
                    let ret = player.ss.points.pow(2).div(10).add(1);
                    return ret;
                },
                effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
            },
			12: {
				title: "Subspace Upgrade 12",
                description: "Second subspace effect is boosted by your subspace energy.",
                cost: new Decimal(8),
                unlocked() { return true }, // The upgrade is only visible when this is true
				effect() { // Calculate bonuses from the upgrade. Can return a single value or an object with multiple values
                    let ret = player.ss.points.add(1).log10().div(3).add(1);
                    return ret;
                },
                effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
            },
			13: {
				title: "Subspace Upgrade 13",
                description: "Subspace boost Super-Generator Power gain.",
                cost: new Decimal(9),
                unlocked() { return true }, // The upgrade is only visible when this is true
				effect() { // Calculate bonuses from the upgrade. Can return a single value or an object with multiple values
                    let base=2;
                    let ret = Decimal.pow(base,player.ss.subspace.add(1).log10().pow(0.9));
                    //if (ret.gte("1e20000000")) ret = ret.sqrt().times("1e10000000")
                    return ret;
                },
                effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
            },
		},
	buyables: {
            rows: 4,
            cols: 2,
            11: {
                title: "1st Subspace Dimension", // Optional, displayed at the top in a larger font
                cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                    let cost = Decimal.pow(1e4, x.pow(1.35))
                    return cost
                },
                effect() {
					let gain=player.ss.dim1;
					gain = gain.mul(Decimal.pow(2,player.ss.buyables[11]));
					gain = gain.mul(tmp.ss.effect);
					return gain;
                },
                display() { // Everything else displayed in the buyable button after the title
                    let data = tmp[this.layer].buyables[this.id]
                    return "You have "+format(player.ss.dim1)+" 1st Subspace Dimensions. ("+format(player.ss.buyables[11])+" bought)<br>"+
                    "They are producing "+format(data.effect)+" subspace per second.<br>"+
					"Cost for Next 1st Subspace Dimension: "+format(data.cost)+" Space";
                },
                unlocked() { return player[this.layer].unlocked }, 
                canAfford() {
                    return tmp.s.getSpace.min(player.s.dim).gte(tmp[this.layer].buyables[this.id].cost)},
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
					player.s.dim = player.s.dim.sub(cost)
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                    player[this.layer].spentOnBuyables = player[this.layer].spentOnBuyables.add(cost) // This is a built-in system that you can use for respeccing but it only works with a single Decimal value
					player[this.layer].dim1 = player[this.layer].dim1.add(1)
                },
                buyMax() {}, // You'll have to handle this yourself if you want
                style: {'height':'222px'},
            },
	}
})
