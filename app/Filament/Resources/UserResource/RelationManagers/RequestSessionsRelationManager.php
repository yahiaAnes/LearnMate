<?php

namespace App\Filament\Resources\UserResource\RelationManagers;

use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\BadgeColumn;
use Filament\Tables\Columns\IconColumn;
use App\Models\User;

class RequestSessionsRelationManager extends RelationManager
{
    protected static string $relationship = 'requestSessions';

    protected static ?string $recordTitleAttribute = 'subject';

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('subject')
                    ->required()
                    ->maxLength(255)
                    ->label('Subject'),
                
                Forms\Components\Textarea::make('description')
                    ->required()
                    ->maxLength(1000)
                    ->label('Description'),
                
                Forms\Components\Select::make('status')
                    ->options([
                        'pending' => 'Pending',
                        'accepted' => 'Accepted',
                        'rejected' => 'Rejected',
                        'completed' => 'Completed',
                    ])
                    ->required()
                    ->label('Status'),
                
                Forms\Components\Select::make('partner_id')
                    ->options(User::where('id', '!=', $this->ownerRecord->id)->pluck('name', 'id'))
                    ->searchable()
                    ->label('Partner')
                    ->required(),
                
                Forms\Components\DateTimePicker::make('time')
                    ->required()
                    ->label('Scheduled Time'),
                
                Forms\Components\Textarea::make('notes')
                    ->maxLength(1000)
                    ->label('Notes'),
                
                Forms\Components\Textarea::make('feedback')
                    ->maxLength(1000)
                    ->label('Feedback'),
            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('subject')
            ->columns([
                TextColumn::make('subject')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('description')
                    ->limit(50)
                    ->searchable(),
                BadgeColumn::make('status')
                    ->colors([
                        'warning' => 'pending',
                        'success' => 'accepted',
                        'danger' => 'rejected',
                        'primary' => 'completed',
                    ]),
                TextColumn::make('user.name')
                    ->label('Requester')
                    ->searchable(),
                TextColumn::make('partner.name')
                    ->label('Partner')
                    ->searchable(),
                TextColumn::make('time')
                    ->dateTime()
                    ->sortable(),
                TextColumn::make('notes')
                    ->limit(30)
                    ->searchable(),
                TextColumn::make('feedback')
                    ->limit(30)
                    ->searchable(),
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable(),
                TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->options([
                        'pending' => 'Pending',
                        'accepted' => 'Accepted',
                        'rejected' => 'Rejected',
                        'completed' => 'Completed',
                    ]),
            ])
            ->headerActions([
                Tables\Actions\CreateAction::make()
                    ->mutateFormDataUsing(function (array $data): array {
                        $data['user_id'] = $this->ownerRecord->id;
                        return $data;
                    }),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }
} 