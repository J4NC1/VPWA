<template>
    <q-scroll-area ref="area" style="width: 100%; height: calc(100vh - 150px)">
      <div style="width: 100%; max-width: 600px; margin: 0 auto;">
        <button @click="$emit('loadMore')" class="top vertical">
        Load messages</button>
        <q-chat-message v-for="message in messages"
          :bg-color="upgradeView(message)"
          :key="message.id"
          :name="message.author.nickname"
          :text="[message.content]"
          :stamp="message.createdAt"
          :sent="isMine(message)"
        />
      </div>
    </q-scroll-area>
</template>
<script lang="ts">
import { QScrollArea } from 'quasar'
import { SerializedMessage } from 'src/contracts'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'ChannelMessagesComponent',
  props: {
    messages: {
      type: Array as PropType<SerializedMessage[]>,
      default: () => []
    }
  },
  watch: {
    messages: {
      handler () {
        this.$nextTick(() => this.scrollMessages())
      },
      deep: true
    }
  },
  computed: {
    currentUser () {
      return this.$store.state.auth.user
    }
  },
  methods: {
    scrollMessages () {
      const area = this.$refs.area as QScrollArea
      area && area.setScrollPercentage('vertical', 1.1)
    },
    isMine (message: SerializedMessage): boolean {
      console.log(this.currentUser)
      return message.author.id === this.currentUser?.id
    },
    upgradeView (message: SerializedMessage): string {
      if (message.content.includes('@' + this.currentUser?.nickname)) {
        return 'light-blue-7'
      } else if (this.isMine(message)) {
        return 'light-blue-1'
      }
      return 'amber-7'
    }
  }
})
</script>
