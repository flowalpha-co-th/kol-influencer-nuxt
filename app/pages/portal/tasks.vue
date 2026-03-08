<template>
  <div class="min-h-screen bg-gray-50 pt-24 pb-12">
    <div class="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">{{ languageStore.t('tasks.title') }}</h1>
        <p class="text-gray-600 mt-1">{{ languageStore.t('tasks.subtitle') }}</p>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <UiCard class="border-0 shadow-md">
          <UiCardContent class="p-4">
            <p class="text-sm text-gray-500">{{ languageStore.t('tasks.pending') }}</p>
            <p class="text-2xl font-bold text-gray-900">{{ taskGroups.pending.length }}</p>
          </UiCardContent>
        </UiCard>
        <UiCard class="border-0 shadow-md">
          <UiCardContent class="p-4">
            <p class="text-sm text-gray-500">{{ languageStore.t('tasks.submitted') }}</p>
            <p class="text-2xl font-bold text-yellow-600">{{ taskGroups.submitted.length }}</p>
          </UiCardContent>
        </UiCard>
        <UiCard class="border-0 shadow-md">
          <UiCardContent class="p-4">
            <p class="text-sm text-gray-500">{{ languageStore.t('tasks.revision') }}</p>
            <p class="text-2xl font-bold text-red-600">{{ taskGroups.revision.length }}</p>
          </UiCardContent>
        </UiCard>
        <UiCard class="border-0 shadow-md">
          <UiCardContent class="p-4">
            <p class="text-sm text-gray-500">{{ languageStore.t('tasks.approved') }}</p>
            <p class="text-2xl font-bold text-green-600">{{ taskGroups.approved.length }}</p>
          </UiCardContent>
        </UiCard>
        <UiCard class="border-0 shadow-md">
          <UiCardContent class="p-4">
            <p class="text-sm text-gray-500">{{ languageStore.t('tasks.done') }}</p>
            <p class="text-2xl font-bold text-primary">{{ taskGroups.done.length }}</p>
          </UiCardContent>
        </UiCard>
      </div>

      <!-- Tasks Tabs -->
      <UiTabs default-value="pending" class="space-y-6">
        <UiTabsList class="bg-white border">
          <UiTabsTrigger value="pending">{{ languageStore.t('tasks.pending') }} ({{ taskGroups.pending.length }})</UiTabsTrigger>
          <UiTabsTrigger value="submitted">{{ languageStore.t('tasks.submitted') }} ({{ taskGroups.submitted.length }})</UiTabsTrigger>
          <UiTabsTrigger value="revision">{{ languageStore.t('tasks.revision') }} ({{ taskGroups.revision.length }})</UiTabsTrigger>
          <UiTabsTrigger value="approved">{{ languageStore.t('tasks.waitingGoLive') }} ({{ taskGroups.approved.length }})</UiTabsTrigger>
          <UiTabsTrigger value="done">{{ languageStore.t('tasks.done') }} ({{ taskGroups.done.length }})</UiTabsTrigger>
        </UiTabsList>

        <UiTabsContent v-for="(tasks, key) in taskGroups" :key="key" :value="key">
          <div class="space-y-4">
            <UiCard
              v-for="task in tasks"
              :key="task.id"
              class="border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
              @click="selectedTask = task; postUrl = ''; draftContent = ''; draftFile = null; draftFileName = ''"
            >
              <UiCardContent class="p-6">
                <div class="flex items-start justify-between">
                  <div class="flex items-start gap-4">
                    <div class="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                      <Clock v-if="task.status === 'in_progress'" class="h-5 w-5 text-blue-500" />
                      <Send v-else-if="task.status === 'submitted'" class="h-5 w-5 text-yellow-500" />
                      <AlertCircle v-else-if="task.status === 'revision'" class="h-5 w-5 text-red-500" />
                      <Rocket v-else-if="task.status === 'approved'" class="h-5 w-5 text-green-500" />
                      <CheckCircle v-else-if="task.status === 'done'" class="h-5 w-5 text-primary" />
                      <Clock v-else class="h-5 w-5 text-gray-500" />
                    </div>
                    <div>
                      <h3 class="font-semibold text-gray-900">{{ task.title }}</h3>
                      <p class="text-sm text-gray-500">{{ task.campaignTitle }}</p>
                      <div class="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <span class="flex items-center gap-1">
                          <Calendar class="h-4 w-4" />
                          {{ languageStore.t('tasks.due') }}: {{ new Date(task.dueDate).toLocaleDateString() }}
                        </span>
                        <span class="flex items-center gap-1">
                          <DollarSign class="h-4 w-4" />
                          ฿{{ task.paymentAmount.toLocaleString() }}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="text-right">
                    <component :is="getStatusBadge(task.status)" />
                    <UiButton variant="ghost" size="sm" class="mt-2">
                      {{ languageStore.t('tasks.viewDetails') }} <ChevronRight class="ml-1 h-4 w-4" />
                    </UiButton>
                  </div>
                </div>
              </UiCardContent>
            </UiCard>

            <div v-if="tasks.length === 0" class="text-center py-12">
              <p class="text-gray-500">{{ languageStore.t('tasks.noTasks') }}</p>
            </div>
          </div>
        </UiTabsContent>
      </UiTabs>
    </div>

    <!-- Task Detail Dialog -->
    <UiDialog :open="!!selectedTask" @update:open="selectedTask = null">
      <UiDialogContent class="max-w-2xl max-h-[90vh] overflow-y-auto">
        <template v-if="selectedTask">
          <UiDialogHeader>
            <UiDialogTitle class="text-xl">{{ selectedTask.title }}</UiDialogTitle>
          </UiDialogHeader>
          <div class="space-y-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-500">{{ languageStore.t('tasks.campaign') }}</p>
                <p class="font-medium">{{ selectedTask.campaignTitle }}</p>
              </div>
              <component :is="getStatusBadge(selectedTask.status)" />
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div class="p-4 bg-gray-50 rounded-xl">
                <p class="text-sm text-gray-500">{{ languageStore.t('tasks.dueDate') }}</p>
                <p class="font-semibold">{{ new Date(selectedTask.dueDate).toLocaleDateString() }}</p>
              </div>
              <div class="p-4 bg-gray-50 rounded-xl">
                <p class="text-sm text-gray-500">{{ languageStore.t('tasks.payment') }}</p>
                <p class="font-semibold text-primary">฿{{ selectedTask.paymentAmount.toLocaleString() }}</p>
              </div>
            </div>

            <div>
              <h4 class="font-semibold text-gray-900 mb-2">{{ languageStore.t('tasks.description') }}</h4>
              <p class="text-gray-600">{{ selectedTask.description }}</p>
            </div>

            <!-- Comments -->
            <div>
              <h4 class="font-semibold text-gray-900 mb-3">{{ languageStore.t('tasks.comments') }}</h4>
              <div class="space-y-3">
                <div
                  v-for="c in selectedTask.comments"
                  :key="c.id"
                  class="p-4 bg-gray-50 rounded-xl"
                >
                  <div class="flex items-center gap-2 mb-2">
                    <span class="font-medium">{{ c.userName }}</span>
                    <span class="text-sm text-gray-500">{{ new Date(c.createdAt).toLocaleDateString() }}</span>
                  </div>
                  <p class="text-gray-600">{{ c.content }}</p>
                </div>
                <p v-if="selectedTask.comments.length === 0" class="text-gray-500 text-sm">{{ languageStore.t('tasks.noComments') }}</p>
              </div>
            </div>

            <!-- Add Comment -->
            <div>
              <h4 class="font-semibold text-gray-900 mb-2">{{ languageStore.t('tasks.addComment') }}</h4>
              <UiTextarea v-model="comment" :placeholder="languageStore.t('tasks.commentPlaceholder')" class="mb-3" />
              <UiButton variant="outline" @click="handleAddComment">
                <MessageSquare class="mr-2 h-4 w-4" />
                {{ languageStore.t('tasks.postComment') }}
              </UiButton>
            </div>

            <!-- Submit Work (in_progress) -->
            <div v-if="selectedTask.status === 'in_progress'" class="space-y-3">
              <div>
                <UiLabel class="mb-1 block">{{ languageStore.t('tasks.draftContent') }}</UiLabel>
                <UiTextarea v-model="draftContent" :placeholder="languageStore.t('tasks.draftContentPlaceholder')" class="min-h-[100px]" />
              </div>
              <div>
                <UiLabel class="mb-1 block">{{ languageStore.t('tasks.attachFile') }}</UiLabel>
                <label class="flex items-center gap-3 p-3 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-primary/50 transition-colors">
                  <Upload class="h-5 w-5 text-gray-400 shrink-0" />
                  <span class="text-sm text-gray-500 truncate">{{ draftFileName || languageStore.t('tasks.chooseFile') }}</span>
                  <input type="file" accept="image/*,video/*" class="hidden" @change="onDraftFileChange" />
                </label>
              </div>
              <UiButton class="w-full bg-primary hover:bg-primary/90" @click="handleSubmitWork">
                <Upload class="mr-2 h-4 w-4" />
                {{ languageStore.t('tasks.submitWork') }}
              </UiButton>
            </div>

            <!-- Resubmit Work (revision) -->
            <div v-else-if="selectedTask.status === 'revision'" class="space-y-3">
              <div class="p-4 bg-red-50 rounded-xl">
                <p class="text-red-700 text-sm font-medium mb-1">{{ languageStore.t('tasks.revisionNote') }}</p>
                <p class="text-red-600 text-sm">{{ languageStore.t('tasks.revisionDesc') }}</p>
              </div>
              <div>
                <UiLabel class="mb-1 block">{{ languageStore.t('tasks.draftContentRevised') }}</UiLabel>
                <UiTextarea v-model="draftContent" :placeholder="languageStore.t('tasks.draftContentRevisedPlaceholder')" class="min-h-[100px]" />
              </div>
              <div>
                <UiLabel class="mb-1 block">{{ languageStore.t('tasks.attachFileRevised') }}</UiLabel>
                <label class="flex items-center gap-3 p-3 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-primary/50 transition-colors">
                  <Upload class="h-5 w-5 text-gray-400 shrink-0" />
                  <span class="text-sm text-gray-500 truncate">{{ draftFileName || languageStore.t('tasks.chooseFile') }}</span>
                  <input type="file" accept="image/*,video/*" class="hidden" @change="onDraftFileChange" />
                </label>
              </div>
              <UiButton class="w-full bg-primary hover:bg-primary/90" @click="handleSubmitWork">
                <Upload class="mr-2 h-4 w-4" />
                {{ languageStore.t('tasks.resubmitWork') }}
              </UiButton>
            </div>

            <!-- Approved → Go Live -->
            <div v-else-if="selectedTask.status === 'approved'" class="space-y-3">
              <div class="p-4 bg-green-50 rounded-xl border border-green-200">
                <p class="font-semibold text-green-900 flex items-center gap-2">
                  <Rocket class="h-4 w-4" /> {{ languageStore.t('tasks.readyGoLive') }}
                </p>
                <p class="text-sm text-green-700 mt-1">{{ languageStore.t('tasks.goLiveDesc') }}</p>
              </div>
              <div class="space-y-2">
                <UiLabel>{{ languageStore.t('tasks.postUrl') }}</UiLabel>
                <UiInput v-model="postUrl" placeholder="https://www.instagram.com/p/..." />
              </div>
              <UiButton
                class="w-full bg-green-600 hover:bg-green-700"
                :disabled="!postUrl.trim()"
                @click="handleGoLive"
              >
                <Rocket class="mr-2 h-4 w-4" /> {{ languageStore.t('tasks.confirmGoLive') }}
              </UiButton>
            </div>

            <!-- Done -->
            <div v-else-if="selectedTask.status === 'done'" class="p-4 bg-primary/5 rounded-xl border border-primary/20">
              <p class="font-semibold text-primary flex items-center gap-2">
                <CheckCircle class="h-4 w-4" /> {{ languageStore.t('tasks.goneLive') }}
              </p>
              <p class="text-sm text-gray-600 mt-1">{{ languageStore.t('tasks.postLink') }} <a :href="selectedTask.postUrl" target="_blank" class="text-primary underline">{{ selectedTask.postUrl }}</a></p>
            </div>
          </div>
        </template>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>

<script setup lang="ts">
import {
  Clock,
  CheckCircle,
  AlertCircle,
  Send,
  MessageSquare,
  Calendar,
  DollarSign,
  ChevronRight,
  Upload,
  Rocket,
} from 'lucide-vue-next'
import { toast } from 'vue-sonner'
import { mockTasks } from '~/data/mockData'
import type { Task } from '~/types'
import { h } from 'vue'

definePageMeta({ layout: 'portal', middleware: 'auth' })

const languageStore = useLanguageStore()
const selectedTask = ref<Task | null>(null)
const comment = ref('')
const postUrl = ref('')
const draftContent = ref('')
const draftFile = ref<File | null>(null)
const draftFileName = ref('')

// Local task state overrides for demo
const taskStatuses = reactive<Record<string, Task['status']>>({})
const taskPostUrls = reactive<Record<string, string>>({})

function getTaskStatus(task: Task): Task['status'] {
  return taskStatuses[task.id] ?? task.status
}

const taskGroups = computed(() => {
  const tasks = mockTasks.map(t => ({ ...t, status: getTaskStatus(t), postUrl: taskPostUrls[t.id] ?? t.postUrl }))
  return {
    pending: tasks.filter(t => t.status === 'pending' || t.status === 'in_progress'),
    submitted: tasks.filter(t => t.status === 'submitted'),
    revision: tasks.filter(t => t.status === 'revision'),
    approved: tasks.filter(t => t.status === 'approved'),
    done: tasks.filter(t => t.status === 'done'),
  }
})

function getStatusBadge(status: string) {
  const t = languageStore.t.bind(languageStore)
  const map: Record<string, { class: string; label: string }> = {
    pending:     { class: '', label: t('tasks.pending') },
    in_progress: { class: 'bg-blue-100 text-blue-700', label: t('tasks.inProgress') },
    submitted:   { class: 'bg-yellow-100 text-yellow-700', label: t('tasks.submitted') },
    revision:    { class: 'bg-red-100 text-red-700', label: t('tasks.revision') },
    approved:    { class: 'bg-green-100 text-green-700', label: t('tasks.waitingGoLive') },
    done:        { class: 'bg-primary/10 text-primary', label: t('tasks.done') },
  }
  const info = map[status] || { class: '', label: status }
  return h(resolveComponent('UiBadge'), { class: info.class }, () => info.label)
}

function onDraftFileChange(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (file) {
    draftFile.value = file
    draftFileName.value = file.name
  }
}

function handleSubmitWork() {
  if (selectedTask.value) taskStatuses[selectedTask.value.id] = 'submitted'
  toast.success(languageStore.t('tasks.submitWork') + ' ✓', { description: languageStore.language === 'th' ? 'รอ admin ตรวจสอบ' : 'Waiting for admin review' })
  draftContent.value = ''
  draftFile.value = null
  draftFileName.value = ''
  selectedTask.value = null
}

function handleGoLive() {
  if (!selectedTask.value || !postUrl.value.trim()) return
  taskStatuses[selectedTask.value.id] = 'done'
  taskPostUrls[selectedTask.value.id] = postUrl.value
  toast.success(languageStore.t('tasks.goneLive'), { description: languageStore.language === 'th' ? 'ส่งลิ้งสำเร็จ รอการยืนยันจาก admin' : 'Link submitted, awaiting admin confirmation' })
  postUrl.value = ''
  selectedTask.value = null
}

function handleAddComment() {
  if (comment.value.trim()) {
    toast.success(languageStore.t('tasks.postComment'), { description: languageStore.language === 'th' ? 'โพสต์ความคิดเห็นแล้ว' : 'Your comment has been posted.' })
    comment.value = ''
  }
}
</script>
