<template>
  <div class="memo">
    <div class="memo-draggable handle">
      <img src="@/assets/img/draggable.svg" alt="draggable">
    </div>
    <div class="memo-contents">
      <button class="memo-check" @click="switchCheck">
        <img src="@/assets/img/checkbox-circle-fill.svg" alt="on" v-if="check">
        <img src="@/assets/img/checkbox-blank-circle-line.svg" alt="off" v-else>
      </button>
      <div class="memo-detail">
        <textarea class="memo-text" maxlength="32" wrap="soft" spellcheck="false"
          v-bind:class="check ? 'color-light-gray' : 'color-black'"
          :value="text"          
          @input="emit('update:text', $event.target.value)"
        ></textarea>
        <div class="memo-data">
          <span class="memo-length">{{ text.length }}/32</span>
          <span></span>
          <div class="memo-icons">
            <div class="memo-information" @click="showModal">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path v-bind:class="check && information.length ? 'fill-light-gray' : information.length ? 'fill-gray' : 'fill-bg'" d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 7H13V9H11V7ZM11 11H13V17H11V11Z"></path>
              </svg>
            </div>
            <span></span>
            <div class="memo-date">
              <label 
                class="memo-calendar"
                v-bind:class="check ? 'memo-calendar-light-gray' : 'memo-calendar-gray'"
              >
                <input 
                  type="date" 
                  :value="date"
                  @input="emit('update:date', $event.target.value)"
                  @change="updateDate"
                >
              </label>
              <template v-if="date">
                <span 
                  class="memo-date-text"
                  v-bind:class="check ? 'color-light-gray' : 'color-gray'"
                >{{ dateFormat }}</span>
              </template>
            </div>
          </div>
        </div>
      </div>
      <button class="memo-delete" aria-label="delete-button" @click="deleteMemo">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path class="close-fill" d="M7.0007 5.5865L11.9504 0.636719L13.3646 2.05093L8.4149 7.0007L13.3646 11.9504L11.9504 13.3646L7.0007 8.4149L2.05093 13.3646L0.636719 11.9504L5.5865 7.0007L0.636719 2.05093L2.05093 0.636719L7.0007 5.5865Z"/>
        </svg>
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  text: String,
  date: String,
  check: Boolean,
  information: String
})

const emit = defineEmits([
  'update:text', 
  'update:date',
  'update:check',
  'deleteMemo',
  'showModal'
])

const checkFlag = ref(props.check as boolean)
const switchCheck = (): void => {
  checkFlag.value = !checkFlag.value
  emit('update:check', checkFlag.value)
}

const dayjs = useDayjs()
const dateFormat = ref(dayjs(props.date).format('MM/DD (ddd)') as string)
const updateDate = (): void => {
  dateFormat.value = dayjs(props.date).format('MM/DD (ddd)')
}

const showModal = (): void => {
  emit('showModal')
}

watch(
  () => props.date,
  updateDate
)

const deleteMemo = (): void => {
  emit('deleteMemo')
}

</script>
<style scoped lang="scss">
.memo {
  width: 100%;
  max-width: 740px;
  height: 64px;
  display: flex;
  @include mq(md) {
    height: 96px;
  }
  @include mq(sm) {
    height: 116px;
  }
  &+& {
    margin-top: 8px;
  }
}

.memo-draggable {
  width: 40px;
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: $white;
  border-radius: 4px 0 0 4px;
  margin-right: 4px;
  cursor: move;
  @include mq(md) {
    height: 96px;
  }
  @include mq(sm) {
    height: 116px;
  }
  img {
    width: 24px;
    height: 24px;
  }
}

.memo-contents {
  width: calc(100% - 44px);
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: $white;
  border-radius: 0 4px 4px 0;
  padding: 12px;
  @include mq(md) {
    height: 96px;
  }
  @include mq(sm) {
    height: 116px;
  }
}

.memo-check {
  width: 24px;
  height: 24px;
  background: $white;
  border: none;
  border-radius: 12px;
  padding: 0;
  margin: 0;
  cursor: pointer;
  &:hover { 
    background: $bg-color;
  }
}

.memo-detail {
  width: calc(100% - 78px);
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @include mq(md) {
    justify-content: space-between;
    align-items: flex-end;
    flex-direction: column;
  }
}

.color-light-gray {
  color: $light-gray;
}

.color-gray {
  color: $gray;
}

.color-black {
  color: $text-black;
}

.fill-light-gray {
  fill: $light-gray;
}

.fill-bg {
  fill: $bg-color;
}

.fill-gray {
  fill: $gray;
}

.memo-text {
  width: calc(100% - 146px);
  height: 24px;
  border: none;
  outline: none;
  font-size: 14px;
  font-weight: 500;
  font-family: "Roboto", "Noto Sans JP";
  white-space: pre-wrap;
  padding: 0;
  margin: 0;
  resize: none;
  overflow:hidden;
  &:focus {
    border-bottom: 2px solid $light-gray;
    &+.memo-data > .memo-length {
      display: block;
    }
    &+.memo-data > .memo-icons > .memo-information {
      display: none;
    }
  }
  @include mq(md) {
    width: 100%;
    height: 44px;
  }
  @include mq(sm) {
    width: 100%;
    height: 64px;
  }
}

.memo-data {
  width: 138px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @include mq(md) {
    width: 100%;
  }
}

.memo-length {
  display: none;
  font-size: 14px;
  font-weight: 500;
  color: $light-gray;
  margin-right: 8px;
}

.memo-information {
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  margin-right: 8px;
  cursor: pointer;
  &:hover {
    background: $bg-color;
    path {
      fill: $light-gray;
    }
  }
}

.memo-date {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.memo-icons {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  @include mq(md) {
    justify-content: space-between;
    width: 100%;
  }
}

.memo-date-text {
  font-size: 14px;
  font-weight: 500;
  margin-left: 8px;
}

.memo-calendar {
  position: relative;
  display: block;
  width: 18px;
  height: 18px;
  input[type=date] {
    position: relative;
    width: 18px;
    height: 18px;
    border: none;
    outline: none;
    background: none;
    opacity: 0;
    padding: 0;
    margin: 0;
    &::-webkit-inner-spin-button{
      -webkit-appearance: none;
    }
    &::-webkit-clear-button{
      -webkit-appearance: none;
    }
    &::-webkit-calendar-picker-indicator {
      position: absolute;
      top: 0;
      right: 0;
      display: block;
      width: 100%;
      height: 100%;
      opacity: 0;
      padding: 0;
      margin: 0;
      cursor: pointer;
    }
  }
}

.memo-calendar-gray {
  &::before {
    position: absolute;
    content: "";
    top: 0;
    right: 0;
    width: 18px;
    height: 18px;
    background-image: url("@/assets/img/calendar-line-gray.svg");
    background-repeat: no-repeat;
  }
}

.memo-calendar-light-gray {
  &::before {
    position: absolute;
    content: "";
    top: 0;
    right: 0;
    width: 18px;
    height: 18px;
    background-image: url("@/assets/img/calendar-line-light-gray.svg");
    background-repeat: no-repeat;
  }
}

.memo-delete {
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: $white;
  border: none;
  border-radius: 15px;
  padding: 0;
  margin: 0;
  cursor: pointer;
  &:hover { 
    background: $bg-color;
    .close-fill {
      fill: $gray;
    }
  }
  .close-fill {
    fill: $light-gray;
  }
}
</style>