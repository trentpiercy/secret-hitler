var app = new Vue({
  el: '#app',
  data: {
    show_inputplayers: true,
    show_roles: false,
    show_rolecard: false,
    show_flip: false,
    show_main: false,
    num_players: "",

    num_liberal: "",
    num_fascist: "",

    player_roles: [],
    role_list: [],

    current_player: 0,
    role: "",
  },

  methods: {
    determine_players: function() {
      if (this.num_players >= 5 && this.num_players <= 10) {
        this.num_players = Math.floor(this.num_players)
        this.show_roles = true
        this.show_flip = true
        this.show_inputplayers = false

        this.num_liberal = Math.round(this.num_players*.6)
        this.num_fascist = this.num_players - this.num_liberal - 1

        this.role_list = ["Hitler"]
        for (i = 0; i < this.num_liberal; i++) {
          this.role_list.push("Liberal")
        }
        for (i = 0; i < this.num_fascist; i++) {
          this.role_list.push("Fascist")
        }

        for (i = 0; i < this.num_players; i++) {
          r = Math.floor(Math.random()*(this.num_players-i))
          this.player_roles.push(this.role_list[r])
          this.role_list.splice(r, 1)
        }

        this.role = this.player_roles[this.current_player]
      }
    },

    next_role: function() {
        if (this.current_player == this.num_players) {
          this.show_roles = false
          this.show_flip = false
          this.show_main = true
        } else {
          this.show_flip = true
        }

        this.show_rolecard = false
    },

    flip: function() {
        this.role = this.player_roles[this.current_player]
        this.current_player += 1
        this.show_rolecard = true
        this.show_flip = false
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
