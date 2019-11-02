<script>
    import Player from '../entities/Player.js';
    import HeroList from '/Hero/HeroList.json';

    export default {
        name: 'HeroFactory',
        props: ['data', 'methods'],
        components: {
        HeroFactory
        }
    };
    data:{
        const player = Player;
        const playerDataList = HeroList; 
    };
    methods:{
        newHero(heroType, heroName){
            try {
                if(heroType.equals("ranger") == true){
                    return player = new player(heroName, Player.types[0], playerDataList[0].max_health, playerDataList[0].damage, playerDataList[0].max_mana);
                }
                else if(heroType.equals("knight") == true){
                    return player = new player(heroName, Player.types[1], playerDataList[1].max_health, playerDataList[1].damage, playerDataList[1].max_mana);
                }
                else if(heroType.equals("mage") == true){
                    return player = new player(heroName, Player.types[2], playerDataList[2].max_health, playerDataList[2].damage, playerDataList[2].max_mana);
                }
                else{
                    throw(error);
                }
            } catch(error) {
                return console.log(error.getMessage);
            }
        }
    };
</script>