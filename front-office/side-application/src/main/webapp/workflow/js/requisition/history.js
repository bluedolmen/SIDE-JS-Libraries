		private String readHistory() {

		      // Build processId string.
		        String processIdString = "jbpm$" + new Long(processId).toString();

		      // Get completed tasks for current workflow instance.
		      WorkflowTaskQuery query = new WorkflowTaskQuery();
		        query.setProcessId(processIdString);
		        query.setTaskState(WorkflowTaskState.COMPLETED);
		        query.setOrderBy(new WorkflowTaskQuery.OrderBy[] {
		                 WorkflowTaskQuery.OrderBy.TaskCreated_Desc,
		                 WorkflowTaskQuery.OrderBy.TaskActor_Asc });
		        List<WorkflowTask> completedTasks = workflowService.queryTasks(query);

		      // Get in-progress tasks for current workflow instance.
		        query.setTaskState(WorkflowTaskState.IN_PROGRESS);
		        List<WorkflowTask> inProgressTasks = workflowService.queryTasks(query);

		        // Join COMPLETED and IN_PROGRESS tasks.
		        List<WorkflowTask> tasks = new ArrayList<WorkflowTask>();
		        tasks.addAll(completedTasks);
		        tasks.addAll(inProgressTasks);

		        // Print the tasks to a String.
		        StringBuffer historyBuffer = new StringBuffer();
		        for (WorkflowTask task : tasks)
		        {
		           // Get task characteristics.
		           Long id = (Long)task.properties.get(WorkflowModel.PROP_TASK_ID);
		           String desc = (String)task.properties.get(WorkflowModel.PROP_DESCRIPTION);
		           Date createdDate = (Date)task.properties.get(ContentModel.PROP_CREATED);
		           String owner = (String)task.properties.get(ContentModel.PROP_OWNER);
		           String comment = (String)task.properties.get(WorkflowModel.PROP_COMMENT);
		           Date completedDate = (Date)task.properties.get(WorkflowModel.PROP_COMPLETION_DATE);
		           String transition = (String)task.properties.get(WorkflowModel.PROP_OUTCOME);
		           String outcome = "";
		           if (transition != null)
		           {
		              WorkflowTransition[] transitions = task.definition.node.transitions;
		              for (WorkflowTransition trans : transitions)
		              {
		                 if (trans.id.equals(transition))
		                 {
		                    outcome = trans.title;
		                    break;
		                 }
		              }
		           }
		           // Write task characteristics.
		           historyBuffer.append(id.toString());
		           historyBuffer.append(" ; ");
		           historyBuffer.append(desc == null ? "" : Utils.encode(desc));
		           historyBuffer.append(" ; ");
		           historyBuffer.append(Utils.encode(task.title));
		           historyBuffer.append(" ; ");
		           historyBuffer.append(createdDate);
		           historyBuffer.append(" ; ");
		           historyBuffer.append(owner == null ? "" : owner);
		           historyBuffer.append(" ; ");
		           historyBuffer.append(comment == null ? "" : Utils.encode(comment));
		           historyBuffer.append(" ; ");
		           historyBuffer.append(completedDate);
		           historyBuffer.append(" ; ");
		           historyBuffer.append(outcome);
		           historyBuffer.append("\n");
		        }
		        return historyBuffer.toString();
		   }
