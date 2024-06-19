<template>
  <div id="app">
    <FileLinks />
  </div>
</template>

<script>
	import { createApp } from 'vue';
	import FileLinks from './components/FileLinks.vue';
	
	const app = createApp({
	  components: {
	    FileLinks
	  }
	});
	
	export default {
		components: {
		    FileLinks
		},
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/* 每个页面公共css */
</style>
