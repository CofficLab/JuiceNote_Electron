<script setup lang="ts">

import fs from 'fs'
import path from 'path'
import Markdown from '../components/Markdown.vue'

var markdown = require("markdown").markdown
var file = fs.readFileSync(path.join(process.cwd(), 'src/markdown/vuejs.md'), 'utf-8');
var message = markdown.toHTML(file)

</script>

<template>
    <Markdown v-html="message"></Markdown>
</template>