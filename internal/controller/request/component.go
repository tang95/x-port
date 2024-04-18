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

type RemoveComponentLinkRequest struct {
	ComponentID string `json:"component_id"`
	Type        string `json:"type"`
	Title       string `json:"title"`
	URL         string `json:"url"`
}
