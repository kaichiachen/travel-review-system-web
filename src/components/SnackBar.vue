<template>
    <md-snackbar :md-position="vertical + ' ' + horizontal" ref="snackbar" :md-duration="duration">
        <span>{{msg}}</span>
    </md-snackbar>
</template>

<script>
export default {
  data() {
    return {
      msg: '',
      vertical: 'top',
      horizontal: 'right',
      duration: 2000,
    };
  },
  methods: {
    open() {
      this.$refs.snackbar.open();
    },
  },
};
</script>
