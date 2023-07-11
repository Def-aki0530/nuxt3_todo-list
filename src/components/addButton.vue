<template>
  <div class="add-button">
    <img src="@/assets/img/add-line.svg" alt="list">
  </div>
</template>
<script setup lang="ts">

</script>
<style lang="scss">
.add-button {
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $gray-white;
  border-radius: 24px;
  margin: 16px auto 0;
  cursor: pointer;
  &:hover {
    background-color: $light-gray;
  }
  img {
    width: 24px;
    height: 24px;
  }
}
</style>