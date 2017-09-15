var app = new Vue({
  el: '#app',
  data: {
    show_inputplayers: true,
    show_rolecard: false,
    num_players: "",
    num_liberal: "",
    num_fascist: "",
    num_hitler: 1,
  },

  methods: {
    determine_players: function() {
      if (this.num_players >= 5 && this.num_players <= 10) {
        this.num_players = Math.floor(this.num_players)
        this.show_rolecard = true
        this.show_inputplayers = false
        this.player_dict = {}

        this.num_liberal = Math.round(this.num_players*.6)
        this.num_fascist = this.num_players - this.num_liberal - 1

        this.role_list = ["h"]
        for (i = 0; i < this.num_liberal; i++) {
          this.role_list // append
        }



        console.log(this.num_liberal, this.num_fascist, this.num_hitler)
      }

    },

  }

})



/* Game Layout
http://www.secrethitler.com/assets/Secret_Hitler_Rules.pdf

Input number of players
Randomize role for each player
Show blank card
Tap to turn over - show role
Tap again to dismiss - pull up new blank card
Repeat for all players

Show board and draw pile
Tap draw pile to pull up 3 cards
Tap card to dismiss 1
Hand to chancellor - taps to dismiss 1 of 2
Last card goes to board
Repeat

*/
