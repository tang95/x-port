package request

type AddComponentAnnotationRequest struct {
	ComponentID string `json:"component_id"`
	Key         string `json:"key"`
	Value       string `json:"value"`
}

type RemoveComponentAnnotationRequest struct {
	ComponentID string `json:"component_id"`
	Key         string `json:"key"`
}

type AddComponentLinkRequest struct {
	ComponentID string `json:"component_id"`
	Type        string `json:"type"`
	Title       string `json:"title"`
	URL         string `json:"url"`
}

type AddComponentDependencyRequest struct {
	SourceID string `json:"source_id"`
	TargetID string `json:"target_id"`
}

type RemoveComponentDependencyRequest struct {
	SourceID string `json:"source_id"`
	TargetID string `json:"target_id"`
}

type RemoveComponentLinkRequest struct {
	ComponentID string `json:"component_id"`
	Type        string `json:"type"`
	Title       string `json:"title"`
	URL         string `json:"url"`
}
