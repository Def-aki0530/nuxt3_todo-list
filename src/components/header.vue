<template>
  <div class="header">
    <div class="header-wrapper">
      <fieldset class="header-select-list">
        <input type="radio" name="select-list" id="list1" 
          value="1"
          :checked="pick == 1"
          @change="emit('update:picked',$event.target.value)"
        >
        <label class="header-list-btn" for="list1">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 2L19.7071 6.70711C19.8946 6.89464 20 7.149 20 7.41421V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V3C4 2.44772 4.44772 2 5 2H15ZM14.171 4H6V20H18V7.829L14.171 4ZM13 16H11V10H10V8H13V16Z" fill="#707070"></path>
          </svg>
        </label>
        <input type="radio" name="select-list" id="list2" 
          value="2"
          :checked="pick == 2"
          @change="emit('update:picked',$event.target.value)"
        >
        <label class="header-list-btn" for="list2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 2L19.7071 6.70711C19.8946 6.89464 20 7.149 20 7.41421V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V3C4 2.44772 4.44772 2 5 2H15ZM14.171 4H6V20H18V7.829L14.171 4ZM12 7.5C13.6569 7.5 15 8.84315 15 10.5C15 11.3841 14.6175 12.179 14.009 12.728L14.0013 12.72L14.0074 12.7294L12.5953 14H15V16H9L8.99926 14.547L12.6691 11.2431C12.8723 11.06 13 10.7949 13 10.5C13 9.94772 12.5523 9.5 12 9.5C11.4477 9.5 11 9.94772 11 10.5H9C9 8.84315 10.3431 7.5 12 7.5Z" fill="#707070"></path>
          </svg>
        </label>
      </fieldset>
      <div class="header-title">
        <img src="@/assets/img/survey-line.svg" alt="list">
        <h1>TO DO LIST</h1>
      </div>
      <div class="header-add-button" @click="addMemo">
        <img src="@/assets/img/add-line.svg" alt="list">
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  pick: String,
})

const emit = defineEmits([
  'addMemo',
  'update:picked'
])

const addMemo = (): void => {
  emit('addMemo')
}

</script>
<style lang="scss">
.header {
  width: 100%;
  height: 64px;
  display: flex;
  align-items: center;
  background-color: $white;
  @include mq(md) {
    height: 52px;
  }
}

.header-wrapper {
  width: 100%;
  max-width: 780px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.header-select-list {
  display: flex;
  input {
    display: none;
    &:checked + label{
      background-color: $green;
      svg{
        path {
          fill: $white;
        }
      }
    }
  }
}

.header-list-btn {
  width: 36px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 18px;
  background-color: $bg-color;
  cursor: pointer;
  &:hover {
    background-color: $gray-white;
  }
  &:last-child {
    margin-left: 8px;
  }
}

.header-title {
  display: flex;
  align-items: center;
  img {
    width: 24px;
    height: 24px;
    margin-right: 8px;
  }
  h1 {
    font-size: 14px;
    font-weight: 700;
    color: $gray;
  }
}

.header-add-button {
  width: 36px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 18px;
  background-color: $bg-color;
  margin-left: 44px;
  cursor: pointer;
  &:hover {
    background-color: $gray-white;
  }
}

</style>