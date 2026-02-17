import { useMemo, useState } from "react";
import type { ApplicationSummary } from "../../types";

export function useSelectedApplication(applications: ApplicationSummary[]) {
	const [selectedAppId, setSelectedAppId] = useState<number | null>(null);

	const resolvedSelectedAppId = useMemo(() => {
		if (applications.length === 0) {
			return null;
		}

		const appExists = applications.some((app) => app.id === selectedAppId);
		if (appExists) {
			return selectedAppId;
		}

		return applications[0].id;
	}, [applications, selectedAppId]);

	const selectedApp = useMemo(
		() => applications.find((app) => app.id === resolvedSelectedAppId) ?? null,
		[applications, resolvedSelectedAppId],
	);

	return {
		selectedApp,
		resolvedSelectedAppId,
		setSelectedAppId,
	};
}
