<script setup>
import SampleOne from './components/practices/basic/SampleOne.vue'
import SampleTwo from './components/practices/basic/SampleTwo.vue'
import VueHtml from './components/practices/basic/VueHtml.vue'
import VueHtmlXss from './components/practices/basic/VueHtmlXss.vue';
import VueText from './components/practices/basic/VueText.vue';
import VueBind from './components/practices/basic/VueBind.vue';
import VueBindClass from './components/practices/basic/VueBindClass.vue';
import VueBindStyle from './components/practices/basic/VueBindStyle.vue';
import VueBindShorthand from './components/practices/basic/VueBindShorthand.vue';
import VueFor from './components/practices/basic/VueFor.vue';
import VuePre from './components/practices/basic/VuePre.vue';
import VueCloak from './components/practices/basic/VueCloak.vue';
import VueOnce from './components/practices/basic/VueOnce.vue';
import VueMemo from './components/practices/basic/VueMemo.vue';
import EventBasic from './components/practices/basic/EventBasic.vue';
import EventObject from './components/practices/basic/EventObject.vue';
import EventModifier from './components/practices/basic/EventModifier.vue';
import ModelBasic from './components/practices/basic/ModelBasic.vue';
import ModelForm from './components/practices/basic/ModelForm.vue';
import ModelModifier from './components/practices/basic/ModelModifier.vue';
import StyleScoped from './components/practices/basic/StyleScoped.vue';
import ReactiveRef from './components/practices/composition/ReactiveRef.vue';
import ReactiveReactive from './components/practices/composition/ReactiveReactive.vue';
import ComputedBasic from './components/practices/composition/ComputedBasic.vue';
import WatchersBasic from './components/practices/composition/WatchersBasic.vue';
import WatchersMulti from './components/practices/composition/WatchersMulti.vue';
import WatchersDeep from './components/practices/composition/WatchersDeep.vue';
import WatchersWatchEffect from './components/practices/composition/WatchersWatchEffect.vue';
import PropsEmitsChild from './components/practices/component/PropsEmitsChild.vue';
import PropsEmitsParent from './components/practices/component/PropsEmitsParent.vue';
import SlotDefaultParent from './components/practices/component/SlotDefaultParent.vue';
import SlotDefaultChild from './components/practices/component/SlotDefaultChild.vue';
import SlotNamedChild from './components/practices/component/SlotNamedChild.vue';
import SlotNamedParent from './components/practices/component/SlotNamedParent.vue';
import SlotScopedChild from './components/practices/component/SlotScopedChild.vue';
import SlotScopedParent from './components/practices/component/SlotScopedParent.vue';
import StoreCounter from './components/practices/library/CountStore.vue';
import AxiosApi from './components/practices/library/AxiosApi.vue';
</script>

<template>
  <div style="padding: 20px">
    <SampleOne />
    <SampleTwo />
    <VueHtml />
    <VueHtmlXss />
    <VueText />
    <VueBind />
    <VueBindClass />
    <VueBindStyle />
    <VueBindShorthand /> 
    <VueFor />
    <VuePre />
    <VueCloak />
    <VueOnce />
    <VueMemo />
    <EventBasic />
    <EventObject />
    <EventModifier />
    <ModelBasic />
    <ModelForm />
    <ModelModifier />
    <StyleScoped />
    <ReactiveRef />
    <ReactiveReactive />
    <ComputedBasic />
    <WatchersBasic />
    <WatchersMulti />
    <WatchersDeep />
    <WatchersWatchEffect />
    <PropsEmitsChild />
    <PropsEmitsParent />
    <SlotDefaultParent />
    <SlotDefaultChild />
    <SlotNamedChild />
    <SlotNamedParent />
    <SlotScopedChild />
    <SlotScopedParent />
    <StoreCounter />
    <AxiosApi />
  </div>

</template>

<style>
@import '@/assets/practice.css';
</style>
