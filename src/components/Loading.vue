<template>
<md-dialog md-open-from="#custom" md-close-to="#custom" ref="dialog">
  <md-dialog-content class="spinner">
    <md-spinner md-indeterminate></md-spinner>
  </md-dialog-content>
</md-dialog>
</template>

<script>
export default {
  methods: {
    open() {
      this.$refs.dialog.open();
    },
    close() {
      this.$refs.dialog.close();
    },
  },
};
</script>

<style>
.spinner {
  margin: 0 auto;
}
</style>