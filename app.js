var app = new Vue({
  el: '#app',
  data: {
    show_inputplayers: true,
    show_roles: false,
    show_rolecard: false,
    show_flip: false,
    show_main: false,
    show_draw: false,
    show_fascist_win: false,
    show_liberal_win: false,
    show_examine_all: false,
    show_examine1: false,
    show_examine2: false,
    show_shuffle: false,
    show_veto: false,
    show_chancellor_confirm: false,

    enable_veto: false,

    show_fascist_5_6: false,
    show_fascist_7_8: false,
    show_fascist_9_10: false,

    examined: false,

    num_players: "",
    num_liberal: "",
    num_fascist: "",

    player_roles: [],
    role_list: [],

    current_player: 0,
    role: "",

    policies_list: [],
    drawn_policies: [],
    discard_tracker: 0,
    num_policies_discarded: 0,
    num_policies_left: 17,
    played_policy: "",
    played_policy_list: [],

    liberal_slots: [false, false, false, false, false],
    fascist_slots: [false, false, false, false, false, false],
    liberal_slot_tracker: 0,
    fascist_slot_tracker: 0,

    show_policies: false,
    show_policy_1: false,
    show_policy_2: false,
    show_policy_3: false,

  },

  methods: {
    start_5: function() {
      this.num_players = 5
      this.determine_players()
    },
    start_6: function() {
      this.num_players = 6
      this.determine_players()
    },
    start_7: function() {
      this.num_players = 7
      this.determine_players()
    },
    start_8: function() {
      this.num_players = 8
      this.determine_players()
    },
    start_9: function() {
      this.num_players = 9
      this.determine_players()
    },
    start_10: function() {
      this.num_players = 10
      this.determine_players()
    },

    fascist_win: function() {
      this.show_draw = false
      this.show_chancellor_confirm = false
      this.show_fascist_win = true
    },
    liberal_win: function() {
      this.show_draw = false
      this.show_chancellor_confirm = false
      this.show_liberal_win = true
    },

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
        this.randomize_policies()

        if (this.num_players == 5 || this.num_players == 6) {
          this.show_fascist_5_6 = true
        } else if (this.num_players == 7 || this.num_players == 8) {
          this.show_fascist_7_8 = true
        } else if (this.num_players == 9 || this.num_players == 10) {
          this.show_fascist_9_10 = true
        }
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

    randomize_policies: function() {
      this.policies_list_temp = [
      "Fascist","Fascist","Fascist","Fascist","Fascist","Fascist",
      "Fascist","Fascist","Fascist","Fascist","Fascist",
      "Liberal","Liberal","Liberal","Liberal","Liberal","Liberal"]

      for (i = 0; i < this.played_policy_list.length; i++) {
        index = this.policies_list_temp.indexOf(this.played_policy_list[i])
        this.policies_list_temp.splice(index, 1)
      }

      this.policies_list = []
      this.policies_list_length = this.policies_list_temp.length
      this.num_policies_discarded = 0

      for (i = 0; i < this.policies_list_length; i++) {
        r = Math.floor(Math.random()*(this.policies_list_length-i))
        this.policies_list.push(this.policies_list_temp[r])
        this.policies_list_temp.splice(r, 1)
      }
      this.show_chancellor_confirm = true
      this.show_shuffle = false
      this.num_policies_left = this.policies_list.length
    },

    veto: function() {
      this.show_veto = false
      this.show_policies = false
      this.show_policy_1 = false
      this.show_policy_2 = false
      this.show_policy_3 = false
      this.show_chancellor_confirm = true
      this.discard_tracker = 0
      this.num_policies_discarded += 1
      if (this.policies_list.length < 3) {
        this.show_shuffle = true
        this.show_draw = false
      }
    },

    confirm_chancellor: function() {
      this.show_chancellor_confirm = false
      this.show_draw = true
    },

    draw_3: function() {
      this.show_veto = false
      this.drawn_policies = []
      this.show_policies = true
      this.show_policy_1 = true
      this.show_policy_2 = true
      this.show_policy_3 = true
      this.show_draw = false
      if (this.policies_list.length >= 3) {
        for (i = 0; i < 3; i++) {
          this.drawn_policies.push(this.policies_list[0])
          this.policies_list.splice(0, 1)
        }
      }
      this.num_policies_left = this.policies_list.length
    },

    discard_1: function() {
      this.show_policy_1 = false
      this.discard_tracker += 1
      this.num_policies_discarded += 1
      if (this.enable_veto) {
        this.show_veto = true
      }
      if (this.discard_tracker == 2) {
        this.show_chancellor_confirm = true
        this.show_policies = false
        this.discard_tracker = 0
        if (this.show_policy_2 == false) {
          this.played_policy = this.drawn_policies[2]
        } else if (this.show_policy_3 == false){
          this.played_policy = this.drawn_policies[1]
        }
        this.play_policy()
      }
    },
    discard_2: function() {
      this.show_policy_2 = false
      this.discard_tracker += 1
      this.num_policies_discarded += 1
      if (this.enable_veto) {
        this.show_veto = true
      }
      if (this.discard_tracker == 2) {
        this.show_chancellor_confirm = true
        this.show_policies = false
        this.discard_tracker = 0
        if (this.show_policy_1 == false) {
          this.played_policy = this.drawn_policies[2]
        } else if (this.show_policy_3 == false){
          this.played_policy = this.drawn_policies[0]
        }
        this.play_policy()
      }
    },
    discard_3: function() {
      this.show_policy_3 = false
      this.discard_tracker += 1
      this.num_policies_discarded += 1
      if (this.enable_veto) {
        this.show_veto = true
      }
      if (this.discard_tracker == 2) {
        this.show_chancellor_confirm = true
        this.show_policies = false
        this.discard_tracker = 0
        if (this.show_policy_1 == false) {
          this.played_policy = this.drawn_policies[1]
        } else if (this.show_policy_2 == false){
          this.played_policy = this.drawn_policies[0]
        }
        this.play_policy()
      }
    },

    play_policy: function() {
      if (this.played_policy == "Fascist") {
        this.fascist_slots[this.fascist_slot_tracker] = true
        this.fascist_slot_tracker += 1
        this.played_policy_list.push("Fascist")
        if (this.fascist_slot_tracker == 5) {
          this.enable_veto = true
        }
        if (this.fascist_slot_tracker == 6) {
          this.fascist_win()
        }
      } else if ((this.played_policy == "Liberal")) {
        this.liberal_slots[this.liberal_slot_tracker] = true
        this.liberal_slot_tracker += 1
        this.played_policy_list.push("Liberal")
        if (this.liberal_slot_tracker == 5) {
          this.liberal_win()
        }
      }

      this.num_policies_left = this.policies_list.length

      examining = false
      if (this.fascist_slots[2] && this.show_fascist_5_6 && this.examined == false) {
        if (this.num_policies_left < 3) {
          this.randomize_policies()
        }
        this.examined = true
        examining = true
        this.show_examine_all = true
        this.show_examine1 = true
        this.show_draw = false
        this.show_chancellor_confirm = false
        this.show_shuffle = false
      }

      if (this.num_policies_left < 3 && examining == false) {
        this.show_shuffle = true
        if (this.show_liberal_win || this.show_fascist_win) {
          this.show_shuffle = false
        }
        this.show_draw = false
        this.show_chancellor_confirm = false
        this.show_policies = false
        this.show_policy_1 = false
        this.show_policy_2 = false
        this.show_policy_3 = false
      }
    },

    show_next_examine: function() {
      this.show_examine1 = false
      this.show_examine2 = true
    },

    dismiss_examine: function() {
      this.show_examine_all = false
      if (this.num_policies_left < 3) {
        this.show_shuffle = true
      } else {
        this.show_chancellor_confirm = true
      }
    }

  }

})
