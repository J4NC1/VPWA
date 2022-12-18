<template>
    <div class="WAL position-relative bg-grey-4" :style="{ height: $q.screen.height + 'px' }"
    >
      <q-layout view="lHh Lpr lFf" class="WAL__layout shadow-3" container>
        <q-header elevated>
          <q-toolbar class="bg-grey-3 text-black">
            <q-btn
              round
              flat
              icon="keyboard_arrow_left"
              class="WAL__drawer-open q-mr-sm"
              @click="leftDrawerOpen = !leftDrawerOpen"
              />
            <q-btn round flat>
              <q-avatar color="primary" text-color="white">G</q-avatar>
            </q-btn>
            <span class="q-subtitle-1 q-pl-md">
              {{ activeChannel }}
            </span>
          </q-toolbar>
        </q-header>
        <q-drawer
          v-model="leftDrawerOpen"
          show-if-above
          bordered
          :breakpoint="690">
          <q-toolbar class="bg-grey-3">
            <q-avatar class="cursor-pointer">
              <img src="https://cdn.quasar.dev/logo-v2/svg/logo.svg" />
            </q-avatar>
            <!--buttton online-->
            <div class="q-pa-md">
              <q-btn-dropdown
              class="glossy"
              color="teal-13"
              label="Account"
            >
              <div class="row no-wrap q-pa-md">
                <div class="column">
                  <div class="text-h6 q-mb-md">Settings</div>
                  <div class="q-pa-md">
                    <q-option-group
                      :options="options"
                      type="radio"
                      v-model="group"
                    />
                  </div>
                </div>
                <q-separator vertical inset class="q-mx-lg" />

                <div class="column items-center">
                  <q-avatar size="72px">
                    <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                  </q-avatar>

                  <div class="text-subtitle1 q-mt-md q-mb-xs">John Doe</div>

                  <q-btn
                  color="primary"
                  label="Logout"
                  push
                  size="sm"
                  v-close-popup
                  />
                </div>
              </div>
              </q-btn-dropdown>
            </div>
            <!--buttton online-->
            <q-space />
            <q-btn round flat icon="more_vert">
              <q-menu auto-close :offset="[110, 8]">
                <q-list style="min-width: 150px">
                  <q-item clickable @click="logout">
                    <q-item-section>Logout</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
            <q-btn
              round
              flat
              icon="close"
              class="WAL__drawer-close"
              @click="leftDrawerOpen = !leftDrawerOpen"
            />
          </q-toolbar>
          <q-scroll-area style="height: calc(100% - 100px)">
            <q-list>
              <q-item
                v-for="(channel, index) in channels"
                :key="index"
                clickable
                v-ripple
                @click="setActiveChannel(channel)">
                <q-item-section>
                  <q-item-label lines="1">
                    {{ channel }}
                  </q-item-label>
                  <q-item-label class="conversation__summary" caption>
                    {{ lastMessageOf(channel)?.content || '' }}
                  </q-item-label>
                </q-item-section>
                <q-item-section side>
                  <!--q-item-label caption>
                    {{ channel }}
                  </q-item-label-->
                  <q-icon name="keyboard_arrow_down" />
                </q-item-section>
              </q-item>
            </q-list>
          </q-scroll-area>
        </q-drawer>
        <q-page-container class="bg-grey-2">
          <router-view />
        </q-page-container>
        <q-footer>
          <q-toolbar class="bg-grey-3 text-black row">
            <q-input v-model="message" :disable="loading" @keydown.enter.prevent="send" rounded outlined dense class="WAL__field col-grow q-mr-sm" bg-color="light-blue-1" placeholder="Type a message" />
            <q-btn :disable="loading" @click="send" round flat icon="send" color="black"/>
          </q-toolbar>
        </q-footer>
      </q-layout>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default defineComponent({
  name: 'ChatLayout',
  setup () {
    return {
      group: ref(null),

      options: [
        { label: 'Online', value: 'online', color: 'green' },
        { label: 'DND', value: 'dnd', color: 'orange' },
        { label: 'Offline', value: 'offline', color: 'red' }
      ]
    }
  },
  data () {
    return {
      statusForm: { online: '', DND: '', offline: '' },
      leftDrawerOpen: false,
      message: '',
      loading: false
    }
  },
  computed: {
    ...mapGetters('channels', {
      channels: 'joinedChannels',
      lastMessageOf: 'lastMessageOf'
    }),
    activeChannel () {
      return this.$store.state.channels.active
    }
  },
  methods: {
    async send () {
      this.loading = true
      await this.addMessage({ channel: this.activeChannel, message: this.message })
      this.message = ''
      this.loading = false
    },
    ...mapMutations('channels', {
      setActiveChannel: 'SET_ACTIVE'
    }),
    ...mapActions('auth', ['logout']),
    ...mapActions('channels', ['addMessage'])
  }
})
</script>

<style lang="sass">
.WAL
  width: 100%
  height: 100%
  padding-top: 20px
  padding-bottom: 20px
  &:before
    content: ''
    height: 127px
    position: fixed
    top: 0
    width: 100%
    background-color: #009688
  &__layout
    margin: 0 auto
    z-index: 4000
    height: 100%
    width: 90%
    max-width: 950px
    border-radius: 5px
  &__field.q-field--outlined .q-field__control:before
    border: none
  .q-drawer--standard
    .WAL__drawer-close
      display: none
@media (max-width: 850px)
  .WAL
    padding: 0
    &__layout
      width: 100%
      border-radius: 0
@media (min-width: 691px)
  .WAL
    &__drawer-open
      display: none
.conversation__summary
  margin-top: 4px
.conversation__more
  margin-top: 0!important
  font-size: 1.4rem
</style>
