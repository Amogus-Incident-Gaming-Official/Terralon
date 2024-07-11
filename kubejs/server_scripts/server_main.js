ServerEvents.recipes(e=>{
    // Removed OP sword from MI.
    e.remove({output: 'modern_industrialization:quantum_sword'})
    e.remove({output: 'tempad:tempad'})
	e.shapeless('ae2:damaged_budding_quartz', ['ae2:charged_certus_quartz_crystal', 'ae2:quartz_block'])
	e.shapeless('ae2:chipped_budding_quartz', ['ae2:charged_certus_quartz_crystal', 'ae2:damaged_budding_quartz'])
	e.shapeless('ae2:flawed_budding_quartz', ['ae2:charged_certus_quartz_crystal', 'ae2:chipped_budding_quartz'])
    e.shaped('tempad:tempad', [
        'SPS',
        'MHU',
        'SNS'
    ], {
        M: 'ae2:monitor',
        U: 'modern_industrialization:basic_upgrade',
        P: 'modern_industrialization:analog_circuit',
        H: 'modern_industrialization:basic_machine_hull',
        N: 'powah:capacitor_nitro',
        S: '#c:steel_plates'
    })
    e.shaped('tempad:he_who_remains_tempad', [
        'SPS',
        'THU',
        'SCS'
    ], {
        T: 'tempad:tempad',
        H: 'modern_industrialization:highly_advanced_machine_hull',
        P: 'modern_industrialization:processing_unit',
        U: 'modern_industrialization:highly_advanced_upgrade',
        C: 'powah:energy_cell_nitro',
        S: '#c:titanium_plates'
    })
    
    e.shapeless('1x minecraft:name_tag', [
        'minecraft:string',
        'minecraft:paper'
    ])

    e.shapeless('3x kubejs:light_repair_pack', [
        '3x #c:nuggets',
        '2x #c:ingots'
    ])
    e.shapeless('4x kubejs:robust_repair_pack', [
        '#c:gears',
        '3x #c:plates',
        '3x #c:ingots',
        '2x #c:nuggets'
    ])
	
	e.recipes.create.mechanical_crafting('techreborn:nuke', [
        ' LSL ',
        'NMRMN',
		'NCACN',
        'NFCFN',
        ' NNN '
    ], { 
		A: 'ae2:singularity',
        M: 'spectrum:moonstone_core',
        N: 'modern_industrialization:nuke',
        S: 'botania:red_string',
        C: 'mythicmetals:carmot_nuke_core',
        R: 'modern_industrialization:redstone_control_module',
        F: 'techreborn:fusion_control_computer',
		L: Item.of('yttr:cage_lamp', '{Inverted:1b,LampColor:"red"}').strongNBT()
    })
    
    e.recipes.create.mechanical_crafting('kubejs:robot_upgrade_core', [
        'YSY',
        'HCH',
        'NTN'
    ], {
        N: 'create_new_age:nuclear_fuel',
        T: 'minecraft:totem_of_undying',
        H: 'moderndynamics:hv_cable',
        C: 'techreborn:data_storage_chip',
        Y: 'yttr:cage_lamp',
        S: 'powah:energy_hopper_spirited'
    })
    
    e.recipes.create.sequenced_assembly([
        Item.of('kubejs:robot_upgrade_kit')], 'kubejs:robot_upgrade_core', [
        e.recipes.createDeploying('kubejs:incomplete_robot_upgrade_kit', ['kubejs:incomplete_robot_upgrade_kit', 'techreborn:lapotronic_orb']),
        e.custom({type: 'create_new_age:energising', energy_needed: 100000, ingredients: [{item: 'kubejs:incomplete_robot_upgrade_kit', count: 1}], results: [{item: 'kubejs:incomplete_robot_upgrade_kit', count: 1}]}),
        e.recipes.createFilling('kubejs:incomplete_robot_upgrade_kit', ['kubejs:incomplete_robot_upgrade_kit', Fluid.of('techreborn:nitro_diesel', 81000)]),
    ]).transitionalItem('kubejs:incomplete_robot_upgrade_kit').loops(1)
})
  

ServerEvents.customCommand('origin', event => {
    event.server.runCommand('origin gui ' + event.player.username)
})

ServerEvents.customCommand('the_book', e=>{
    e.player.give(Item.of('eccentrictome:tome', '{"eccentrictome:mods":{ae2:{0:{Count:1b,id:"ae2:guide"}},bewitchment:{0:{Count:1b,id:"bewitchment:book_of_shadows"}},botania:{0:{Count:1b,id:"botania:lexicon"}},haema:{0:{Count:1b,id:"haema:book_of_blood"}},hexcasting:{0:{Count:1b,id:"patchouli:guide_book",tag:{"patchouli:book":"hexcasting:thehexbook"}}},modern_industrialization:{0:{Count:1b,id:"modern_industrialization:guidebook"}},powah:{0:{Count:1b,id:"powah:book"}},spectrum:{0:{Count:1b,id:"spectrum:guidebook"}}},"eccentrictome:version":1}').enchant('yigd:soulbound', 1))
})

ServerEvents.customCommand('event_mode_on',e=>{
    //if (e.player.hasPermission(2)) {
    //    e.server.runCommandSilent('scoreboard objectives setdisplay belowName')
    //    e.server.runCommandSilent('gamerule keepInventory false')
    //    e.server.runCommandSilent('gamerule doDaylightCycle false')
    //}
})

ServerEvents.customCommand('event_mode_off',e=>{
    //if (e.player.hasPermission(2)) {
    //    e.server.runCommandSilent('scoreboard objectives setdisplay belowName deaths')
    //    e.server.runCommandSilent('gamerule keepInventory true')
    //    e.server.runCommandSilent('gamerule doDaylightCycle true')
    //}
})

ServerEvents.tags('item', e=>{
    e.add('fayne_origins:metal_repair_resources','kubejs:light_repair_pack')
    e.add('fayne_origins:strong_metal_repair_resources','kubejs:robust_repair_pack')
    e.add('fayne_origins:energy_sources','minecraft:coal')
    e.add('fayne_origins:energy_sources','minecraft:charcoal')
    e.add('fayne_origins:energy_sources','modern_industrialization:lignite_coal')
    e.add('fayne_origins:energy_sources','minecraft:glowstone_dust')
    e.add('fayne_origins:energy_sources','minecraft:blaze_powder')
    //e.add('fayne_origins:high_energy_sources','minecraft:blaze_rod')
    //e.add('fayne_origins:high_energy_sources','modern_industrialization:fuel_rod')
    e.add('fayne_origins:upgrade_items','kubejs:robot_upgrade_kit')
    e.add('fayne_origins:upgrade_items','modern_industrialization:advanced_upgrade')
})

PlayerEvents.loggedIn(e=>{
    if (!e.player.stages.has('starting_items')) {
        e.player.stages.add('starting_items')
        e.server.scheduleInTicks(50, callback => {
            e.player.give(Item.of('eccentrictome:tome', '{"eccentrictome:mods":{bewitchment:{0:{Count:1b,id:"bewitchment:book_of_shadows"}},botania:{0:{Count:1b,id:"botania:lexicon"}},byg:{0:{Count:1b,id:"byg:biomepedia"}},haema:{0:{Count:1b,id:"haema:book_of_blood"}},hexcasting:{0:{Count:1b,id:"patchouli:guide_book",tag:{"patchouli:book":"hexcasting:thehexbook"}}},modern_industrialization:{0:{Count:1b,id:"modern_industrialization:guidebook"}},powah:{0:{Count:1b,id:"powah:book"}},spectrum:{0:{Count:1b,id:"spectrum:guidebook"}}}}').enchant('yigd:soulbound', 1))
        });
    }
})

function removeAdvancement(advancementFilePath) {
    let arr = []
    if (typeof (advancementFilePath) == 'string') arr = [advancementFilePath]
    else if (typeof (advancementFilePath) == 'object') arr = advancementFilePath
    else console.log(`Invalid type for removeAdvancement(${advancementFilePath})`)

    ServerEvents.highPriorityData(event => {
        event.addJson('yourmodpack:advancements/removed', {
            display: { hidden: true },
        })
        arr.forEach(advancement => {
            event.addJson(`${advancement}.json`, {
                parent: 'yourmodpack:advancements/removed',
                display: { hidden: true },
                criteria: {
                    impossible: {
                        trigger: 'minecraft:impossible'
                    }
                },
                requirements: [['impossible']]
            })
        })
    })
}
// removes the haema advancements because I think they're annoying, and a few book giver achievements.
removeAdvancement([
    'haema:advancements/use_blood',
    'haema:advancements/drink_blood',
    'haema:advancements/drink_good_blood',
    'haema:advancements/drink_player_blood',
    'haema:advancements/fail_conversion',
    'haema:advancements/get_blood',
    'haema:advancements/kill_vampire_hunter',
    'haema:advancements/root',
    'haema:advancements/store_blood',
    'haema:advancements/trigger_vampire_hunters',
    'haema:advancements/use_invis',
    'haema:advancements/use_dash',
    'haema:advancements/use_mist',
    'haema:advancements/use_ritual_table',
    'haema:advancements/fulfil_contract',
    'haema:advancements/create_ritual_table',
    'haema:advancements/get_contract',
    'hexcasting:advancements/grant_patchi_book',
])

