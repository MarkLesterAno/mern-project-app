import { Container, Grid, Skeleton } from '@mantine/core';

interface ContentProps {
    children: React.ReactNode;
    isLoading?: boolean;
    skeletonCount?: number;
}

export function Content({ children, isLoading = false, skeletonCount = 3 }: ContentProps) {
    // Render skeletons if loading
    if (isLoading) {
        return (
            <Container my="md">
                <Grid>
                    {Array.from({ length: skeletonCount }).map((_, index) => (
                        <Grid.Col key={index} span={12}>
                            <Skeleton height={140} radius="md" animate />
                        </Grid.Col>
                    ))}
                </Grid>
            </Container>
        );
    }

    // Render children when not loading
    return (
        <Container my="md">
            {children}
        </Container>
    );
}